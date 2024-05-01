export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: "",
    isLoading: false,
  },

  getters: {},

  mutations: {
    initializeStore(state) {
      const cartFromStorage = localStorage.getItem("cart");
      if (cartFromStorage) {
        state.cart = JSON.parse(cartFromStorage);
      }
    },

    addToCart(state, item) {
      const exists = state.cart.items.filter(
        (i) => i.product.id === item.product.id
      );

      if (exists.length) {
        exists[0].quantity =
          parseInt(exists[0].quantity) + parseInt(item.quantity);
      } else {
        state.cart.items.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },

  actions: {
    initializeStore({ commit }) {
      commit("initializeStore");
    },
  },

  modules: {},
});

//TODO : Fix state issue with vuex store
