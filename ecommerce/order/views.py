import stripe
from django.conf import settings
from django.http import Http404
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order, OrderItem
from .serializers import OrderSerializer

@api_view(['POST'])
def checkout(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        stripe.api_key = settings.STRIPE_KEY
        paid_amount = sum(item.get('quantity') * item.get('product').price for item in serializer.validated_data['items'])
        try:
            charge = stripe.Charge.create(
                amount=int(paid_amount * 100),
                currency='USD',
                description='Charge from KONLY',
                source=serializer.validated_data['stripe_token']
            )
            if request.user.is_authenticated:
                serializer.save(user=request.user, paid_amount=paid_amount)
            else:
                serializer.save(paid_amount=paid_amount)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)