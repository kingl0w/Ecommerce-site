import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

console.log("VUE_APP_API_URL:", process.env.VUE_APP_API_URL);
axios.defaults.baseURL =
  process.env.VUE_APP_API_URL || "http://54.90.211.136/api/v1";
console.log("axios.defaults.baseURL:", axios.defaults.baseURL);

store.dispatch("initializeStore");
createApp(App).use(store).use(router, axios).mount("#app");
