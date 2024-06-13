Certainly! Here's the updated MyAccount.vue component with the necessary
changes: vueCopy code
<template>
  <div class="page-my-account">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">My Account</h1>
      </div>
      <div class="column is-12">
        <button @click="logout()" class="button is-danger">Log Out</button>
      </div>
      <div class="column is-12">
        <h2 class="subtitle">My Orders</h2>
        <order-table :orders="orders" :products="products"></order-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OrderTable from "@/components/OrderTable.vue";

export default {
  name: "MyAccount",
  components: {
    OrderTable,
  },
  data() {
    return {
      orders: [],
      products: [],
    };
  },
  mounted() {
    this.fetchOrders();
    this.fetchProducts();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await axios.get("/api/v1/orders/", {
          headers: {
            Authorization: `Token ${this.$store.state.token}`,
          },
        });
        this.orders = response.data;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get("/api/v1/latest-products/");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    logout() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
      this.$store.commit("removeToken");
      this.$router.push("/");
    },
  },
};
</script>
