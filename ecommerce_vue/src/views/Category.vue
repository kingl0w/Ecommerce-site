<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
      </div>
      <ProductBox
        v-for="product in category.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
import ProductBox from "@/components/ProductBox.vue";

export default {
  name: "Category",
  data() {
    return {
      category: {
        products: [],
      },
    };
  },
  components: {
    ProductBox,
  },
  mounted() {
    this.getCategory();
  },
  watch: {
    $route(to, from) {
      this.getCategory();
    },
  },
  methods: {
    async getCategory() {
      const categorySlug = this.$route.params.category_slug;
      this.$store.commit("setIsLoading", true);
      await axios
        .get(`/api/v1/products/${categorySlug}/`)
        .then((response) => {
          this.category = response.data;
          document.title = this.category.name + " | KONLY";
        })
        .catch((error) => {
          console.error(error);
          toast({
            message: "Oops! Something went wrong. Please try again.",
            type: "is-danger",
            position: "bottom-right",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
          });
        });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
