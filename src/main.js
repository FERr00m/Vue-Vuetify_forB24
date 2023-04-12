import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index.js";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
    aliases,
    sets: {
      mdi,
    },
  },

});
// Assets
import "./assets/normalize.css";
import "./assets/main.css";

const app = createApp(App);

app.use(store).use(router).use(vuetify).mount("#app");
