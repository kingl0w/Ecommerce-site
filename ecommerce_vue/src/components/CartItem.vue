<template>
  <tr>
    <td>
      <router-link :to="item.product.get_absolute_url">{{
        item.product.name
      }}</router-link>
    </td>
    <td>${{ item.product.price }}</td>
    <td>
      <div class="quantity-control">
        <span @click="decrementQuantity(item)">
          <i class="fas fa-minus" style="pointer-events: none"></i>
        </span>
        {{ item.quantity }}
        <span @click="incrementQuantity(item)">
          <i class="fas fa-plus" style="pointer-events: none"></i>
        </span>
      </div>
    </td>
    <td>${{ getItemTotal(item).toFixed(2) }}</td>
    <td><button class="delete" @click="removeFromCart(item)"></button></td>
  </tr>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    initialItem: Object,
  },
  data() {
    return {
      item: this.initialItem,
    };
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    decrementQuantity(item) {
      item.quantity -= 1;
      if (item.quantity === 0) {
        this.$emit("removeFromCart", item);
      }
      this.updateCart();
    },
    incrementQuantity(item) {
      item.quantity += 1;
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
    },
    removeFromCart(item) {
      this.$emit("removeFromCart", item);
      this.updateCart();
    },
  },
};
</script>

<style scoped>
.quantity-control {
  display: flex;
  align-items: center;
  margin-left: -0.5rem;
}

.quantity-control span {
  cursor: pointer;
  font-size: 1.3rem;
  padding: 0 0.5rem;
}

.quantity-control i {
  vertical-align: middle;
}
</style>
