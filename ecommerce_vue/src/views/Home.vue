<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">KONLY Apparel</p>
        <p class="subtitle">The best place to find the latest street wear</p>
      </div>
    </section>

    <div class="columns is-multiline is-centered is-desktop">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered mb-6">Latest Products</h2>
      </div>

      <div v-if="latestProducts.length > 0">
        <div
          class="column is-one-third-desktop"
          v-for="product in latestProducts"
          :key="product.id"
        >
          <div class="box">
            <figure class="image mb-4">
              <img :src="product.get_thumbnail" />
            </figure>
            <h3 class="is-size-4">{{ product.name }}</h3>
            <p class="is-size-6 has-text-grey">${{ product.price }}</p>
            View Details
          </div>
        </div>
      </div>

      <div v-else>
        <p>No products available.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      latestProducts: [],
    };
  },
  components: {},
  mounted() {
    this.getLatestProducts();
  },
  methods: {
    getLatestProducts() {
      axios
        .get("/api/v1/latest-products/")
        .then((response) => {
          this.latestProducts = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.box {
  width: 20rem;
}

.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
</style>
