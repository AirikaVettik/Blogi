

<template>
  <div id="app">
    <NavBar />
      <div class="container">
      <Errors v-if="error" :msg="error" />
      <router-view />
      </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import {mapGetters} from 'vuex'
import NavBar from "./components/NavBar.vue";
import Errors from "./components/Errors.vue";

export default {
  components: {
    NavBar,
    Errors,
  },
  computed: {
    ...mapGetters(["error"])
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>