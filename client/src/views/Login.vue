<template>
  <div class="login">
    <div>
      <form @submit.prevent="loginUser">
        <label for="username">Kasutajanimi:</label>

        <div>
          <input id="username" type="text" name="username" v-model="username" />
        </div>

        <label for="password">Parool:</label>

        <div>
          <input
            id="password"
            type="password"
            name="password"
            v-model="password"
          />
        </div>

        <button>Logi sisse!</button>
      </form>

      <router-link to="/register"> Registreeri kasutajaks </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      let user = {
        username: this.username,
        password: this.password,
      };
      this.login(user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push("/posts");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
form {
  max-width: 700px;
  margin: 0 auto;
  padding-top: 50px;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input {
  width: 30%;
  border: 0;
  background-color: #f2f2f2;
  padding: 15px;
  margin: 5px;
  border-radius: 30px;
  box-shadow: 0 10px 10px rgb(0 0 0 / 20%);
}

button {
  background-color: #f2f2f2;
  color: #363636;
  padding: 12px 20px;
  cursor: pointer;
  border: 0;
  border-radius: 30px;
  margin: 50px;
}
</style>
