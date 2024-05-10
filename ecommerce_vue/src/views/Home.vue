<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">KONLY Apparel</p>
        <p class="subtitle">The best place to find the latest street wear</p>
      </div>
    </section>
    <div class="container">
      <div class="columns is-multiline is-centered">
        <div class="column is-12">
          <h2 class="is-size-2 has-text-centered mb-6">Latest Products</h2>
        </div>
        <template v-if="latestProducts.length > 0">
          <div class="column is-12">
            <div class="columns is-multiline is-centered">
              <ProductBox
                v-for="product in latestProducts"
                :key="product.id"
                :product="product"
              />
            </div>
          </div>
        </template>
        <div v-else class="column is-12">
          <p>No products available.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import ProductBox from "@/components/ProductBox.vue";

export default {
  name: "Home",
  data() {
    return {
      latestProducts: [],
    };
  },
  components: {
    ProductBox,
  },
  mounted() {
    this.getLatestProducts();
    document.title = "Home | KONLY";
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit("setIsLoading", true);
      await axios
        .get("/api/v1/latest-products/")
        .then((response) => {
          this.latestProducts = response.data;
        })
        .catch((error) => {
          console.error(error);
        });

      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
}
</style>
