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
            <a class="button is-dark" @click="addToCart">Add To Cart</a>
          </div>
        </div>
      </div>
    </div>
    <div class="toast" :class="{ 'is-active': showToast }">
      <div class="toast-content">
        <p>{{ toastMessage }}</p>
        <button class="delete" @click="dismissToast"></button>
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
      showToast: false,
      toastMessage: "",
    };
  },
  mounted() {
    this.get_product();
  },
  methods: {
    async get_product() {
      this.$store.commit("setIsLoading", true);
      const category_slug = this.$route.params.category_slug;
      const product_slug = this.$route.params.product_slug;
      await axios
        .get(`/api/v1/products/${category_slug}/${product_slug}/`)
        .then((response) => {
          this.product = response.data;
          document.title = this.product.name + " | KOLY";
        })
        .catch((error) => {
          console.error(error);
        });
      this.$store.commit("setIsLoading", false);
    },
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }
      const item = {
        product: this.product,
        quantity: this.quantity,
      };
      this.$store.commit("addToCart", item);
      this.showToastMessage("Added to cart");
    },
    showToastMessage(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2000);
    },
    dismissToast() {
      this.showToast = false;
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

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #00d1b2;
  color: #fff;
  padding: 15px 25px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  min-width: 250px;
  max-width: 400px;
  box-sizing: border-box;
}

.toast.is-active {
  opacity: 1;
  pointer-events: auto;
}

.toast-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toast-content p {
  margin: 0;
  font-size: 16px;
  line-height: 1.4;
}

.delete {
  margin-left: 15px;
  flex-shrink: 0;
}
</style>
