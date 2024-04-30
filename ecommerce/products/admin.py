from django.contrib import admin
from .models import Category, Product

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')  
    fields = ('name', 'slug')        
    prepopulated_fields = {'slug': ('name',)}  

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'category', 'price', 'date_added')  
    list_filter = ('category', 'date_added')  
    prepopulated_fields = {'slug': ('name',)}  
    search_fields = ('name',)  

admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)