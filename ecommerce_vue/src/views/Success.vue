<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <h1 class="title">Thank you for your purchase</h1>

      <p>Your order will be processed withing 48 hours</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Success",
  mounted() {
    document.title = "Success | KONLY Apparel";
  },
};
</script>
