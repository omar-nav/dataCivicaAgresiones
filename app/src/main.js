import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import "vue-googlemaps/dist/vue-googlemaps.css";
import VueGoogleMaps from "vue-googlemaps";

Vue.use(VueMaterial);

Vue.use(VueGoogleMaps, {
  load: {
    apiKey: "AIzaSyAxX_RX06ZBc87SoYN6LXpGeWZJIEml30k",
    libraries: ["places"],
    useBetaRenderer: false
  },
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
