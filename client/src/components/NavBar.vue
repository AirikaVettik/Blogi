
<template>
  <div id="nav">
  <ul>
    <router-link id="navlink" to="/" v-if="!isLoggedIn">Blogi</router-link> 
    <router-link id="navlink" to="/login" v-if="!isLoggedIn"> Logi sisse </router-link> 
    <router-link id="navlink" to="/register" v-if="!isLoggedIn"> Registreeri kasutajaks </router-link> 
  </ul>
  <ul>
    <router-link id="navlink" to="/posts" v-if="isLoggedIn"> Kirjuta uus postitus </router-link> 
    <a to="/blogi" v-if="isLoggedIn" @click.prevent="logoutUser"> Logi välja </a>  
  </ul>
<hr>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },

  methods: {
    ...mapActions (["logout"]),

    logoutUser() {
      this.logout()
    }
  },
} 

</script>


<style scoped>

#nav {
  padding-top: 70px;
  margin: auto;
}
hr {
  margin-top: 30px;
  width: 50%,
}
#navlink {
 margin: 10px;
}


</style>