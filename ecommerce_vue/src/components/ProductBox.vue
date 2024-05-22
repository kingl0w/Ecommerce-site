<template>
  <div class="column is-half-tablet is-one-third-desktop">
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
</template>

<script>
export default {
  name: "ProductBox",
  props: {
    product: {
      type: Object,
      required: true,
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
