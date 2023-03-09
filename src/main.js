import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});
// Assets
import "./assets/normalize.css";
import "./assets/main.css";
import "./assets/materialdesignicons.min.css";

const app = createApp(App);

app.use(store).use(router).use(vuetify).mount("#app");
