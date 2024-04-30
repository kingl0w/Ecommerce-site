<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"
          ><strong>KOLY</strong></router-link
        >
        <a
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
          @click="showModileMenu = !showModileMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        class="navbar-menu"
        id="navbar-menu"
        v-bind:class="{ 'is-active': showModileMenu }"
      >
        <div class="navbar-end">
          <router-link to="/shirts" class="navbar-item">Shirts</router-link>
          <router-link to="/hoodies" class="navbar-item">Hoodies</router-link>

          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/log-in" class="button is-light">
                <strong>Log In</strong>
              </router-link>
              <router-link to="/cart" class="button is-success">
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                <span>Cart</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="section">
      <router-view />
    </section>

    <footer class="footer">
      <p class="has-text-centered">A Taddymason creation</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModileMenu: false,
    };
  },
};
</script>

<style lang="scss">
@import "../node_modules/bulma";
</style>
