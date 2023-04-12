<script>
import Custom from './components/Custom.vue';
import BX24Wrapper from './assets/libs/bx24-wrapper.js';
import {
  mdiWeatherSunny,
  mdiWeatherNight,
} from '@mdi/js';

export default {
  data() {
    return {
      // Icons
      mdiWeatherSunny,
      mdiWeatherNight,
      
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
    try {
      BX24.init(() => {
        const bx24 = new BX24Wrapper();

        bx24.callBatch([['user.get', {}], ['department.get', {}]])
          .then(res => {
            this.users = res[0];
            this.departments = res[1];
            console.log(res);
          })
          .catch(e => {
            console.warn(e);
          })
          .finally(() => { this.isMounted = true; })

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

        <v-btn :prepend-icon="theme === 'light' ? mdiWeatherSunny : mdiWeatherNight" @click="changeTheme">Toggle
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');

body {
  font-family: 'Raleway', sans-serif;
}
</style>
