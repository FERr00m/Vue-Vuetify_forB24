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
    };
  },
  beforeMount() {
    this.setTheme();
  },
  mounted() {
    setTimeout(() => {
      this.isMounted = true;
    }, 1000);
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
            {{ message }}
          </h1>

          <Custom :maincount="count" @maincountup="mainCountUp">
          </Custom>

          <router-view :text="text"></router-view>
        </v-container>

      </v-main>



    </v-app>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
