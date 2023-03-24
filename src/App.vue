<script>
import Custom from './components/Custom.vue';

export default {
  data() {
    return {
      isMounted: false,
      themeFromLocalStorage: this.setTheme(),
      themeObject: {
        'v-theme--light': this.themeFromLocalStorage === 'light',
        'v-theme--dark': this.themeFromLocalStorage === 'dark',
      },
      message: 'Hello Vue!',
      count: 10,
      theme: 'light',
      text: 'Textsss',
      user: null
    };
  },
  beforeMount() {
    this.setTheme();

  },
  mounted() {
    setTimeout(() => {
      this.isMounted = true;
    }, 1000);
    try {
      BX24.init(() => {
        BX24.callMethod("user.get", {}, (res) => {
          this.user = res.data()[0];
          console.log(Object.entries(this.user));
          for (let [field, value] of Object.entries(this.user)) {
            console.log('Pole ', field);
            console.log('Val ', value);
          }
        });

      })
    } catch (error) {
      console.warn(error);
    }

  },
  provide() {
    return {
      mainCount: this.count,
    };
  },
  methods: {
    changeTheme() {
      this.themeFromLocalStorage =
        this.themeFromLocalStorage === 'light' ? 'dark' : 'light';
      this.theme = this.themeFromLocalStorage;
      localStorage.setItem('theme', this.themeFromLocalStorage);
    },
    mainCountUp() {
      this.count++;
    },
    setTheme() {
      if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'light');
        this.themeFromLocalStorage = 'light';
        this.theme = this.themeFromLocalStorage;
      } else {
        this.themeFromLocalStorage = localStorage.getItem('theme');
        this.theme = this.themeFromLocalStorage;
      }
      return this.themeFromLocalStorage;
    },
  },
  components: {
    Custom,
  },
}
</script>

<template>
  <transition name="fade">
      <div v-show="!isMounted" class="loader-wrap" :class="themeObject">
        <div class="lds-roller main-loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </transition>
  <v-app :theme="theme" v-cloak>
      <v-app-bar>
        <v-spacer></v-spacer>

        <router-link custom to="./" v-slot="{ navigate, isActive }">
          <v-btn class="my-class" prepend-icon="mdi-star" :color="isActive ? 'secondary' : ''" @click="navigate">

            Home
          </v-btn>
        </router-link>
        <router-link custom to="./about" v-slot="{ navigate, isActive }">
          <v-btn :color="isActive ? 'secondary' : ''" @click="navigate">

            About
          </v-btn>
        </router-link>

        <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="changeTheme">Toggle
          Theme
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <h1>
            {{ message + ' ' + user?.EMAIL }}
          </h1>

          <Custom :maincount="count" @maincountup="mainCountUp">
          </Custom>

          <router-view :text="text"></router-view>
        </v-container>

      </v-main>



    </v-app>
</template>

<style scoped>

</style>
