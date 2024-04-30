<template>
  <div class="page-product">
    <div class="columns is-multiline">
      <div class="column is-8">
        <div class="columns is-centered">
          <div class="column is-12 has-text-centered">
            <figure class="image mb-6">
              <img v-bind:src="product.get_image" alt="Product Image" />
            </figure>
            <h1 class="title">{{ product.name }}</h1>
            <p class="subtitle">{{ product.description }}</p>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <h2 class="subtitle">Information</h2>
        <p><strong>Price: </strong>${{ product.price }}</p>
        <div class="field has-addons mt-6">
          <div class="control">
            <input class="input" type="number" min="1" v-model="quantity" />
          </div>
          <div class="control">
            <a class="button is-dark">Add To Cart</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Product",
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  mounted() {
    this.get_product();
  },
  methods: {
    get_product() {
      const category_slug = this.$route.params.category_slug;
      const product_slug = this.$route.params.product_slug;

      axios
        .get(`/api/v1/products/${category_slug}/${product_slug}/`)
        .then((response) => {
          this.product = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.page-product .image {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  text-align: center;
  width: 100%;
}

.page-product .image img {
  width: 100%;
  height: auto;
  max-width: 400px;
  max-height: 400px;
  border-radius: 4%;
}

@media (max-width: 768px) {
  .page-product .image img {
    max-width: 350px;
    max-height: 350px;
  }
}

@media (max-width: 480px) {
  .page-product .image img {
    max-width: 300px;
    max-height: 300px;
  }
}
</style>
