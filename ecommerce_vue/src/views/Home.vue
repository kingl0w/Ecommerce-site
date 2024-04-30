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
        <div class="columns is-multiline">
          <div
            class="column is-6-desktop is-12-mobile"
            v-for="product in latestProducts"
            :key="product.id"
          >
            <div class="box">
              <figure class="image mb-4">
                <img :src="product.get_thumbnail" alt="Product image" />
              </figure>
              <h3 class="is-size-4">{{ product.name }}</h3>
              <p class="is-size-6 has-text-grey">${{ product.price }}</p>
              <router-link
                v-bind:to="product.get_absolute_url"
                class="button is-dark mt-4"
              >
                View Product
              </router-link>
            </div>
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
  width: auto;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image {
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  overflow: hidden;
  text-align: center;
}

.image img {
  width: 70vw;
  height: auto;
  object-fit: cover;
  border-radius: 4%;
}

@media screen and (min-width: 768px) {
  .box {
    width: 25rem;
    margin: 1rem;
  }

  .image img {
    width: 25rem;
    height: auto;
    object-fit: cover;
    border-radius: 4%;
  }
}
</style>
