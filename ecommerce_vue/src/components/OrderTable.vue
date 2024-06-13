<template>
  <div class="order-table">
    <div v-for="order in orders" :key="order.id" class="box custom-box mb-4">
      <h3 class="is-size-4 mb-6">Order #{{ order.id }}</h3>
      <h4 class="is-size-5">Products</h4>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.items" :key="item.id">
            <td>{{ getProductName(item.product) }}</td>
            <td>${{ getUnitPrice(item).toFixed(2) }}</td>
            <td>{{ item.quantity }}</td>
            <td>${{ getItemTotal(item).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <p class="mb-4">Total Items: {{ orderTotalLength(order) }}</p>
      <p>Order Total: ${{ order.paid_amount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderTable",
  props: {
    orders: {
      type: Array,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getUnitPrice(item) {
      return item.price / item.quantity;
    },
    getProductName(productId) {
      const product = this.products.find((p) => p.id === productId);
      return product ? product.name : "";
    },
    getItemTotal(item) {
      const unitPrice = this.getUnitPrice(item);
      return unitPrice * item.quantity;
    },
    orderTotalLength(order) {
      return order.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
  },
};
</script>

<style scoped>
.custom-box {
  box-shadow: none;
  border: 2px solid #808080;
}
</style>
