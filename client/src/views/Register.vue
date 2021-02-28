<template>
  <div class="login">
    <div>
      <form @submit.prevent="registerUser">
        <label for="name">Sinu nimi:</label>

        <div>
          <input id="name" type="text" name="name" v-model="name" />
        </div>

        <label for="email">Sinu email:</label>

        <div>
          <input id="email" type="text" name="email" v-model="email" />
        </div>

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

        <label for="confirm_password">Korda parooli:</label>

        <div>
          <input
            id="confirm_password"
            type="password"
            name="confirm_password"
            v-model="confirm_password"
          />
        </div>

        <button>Registreeri kasutajaks!</button>
      </form>

      <router-link to="/login"> Kasutaja olemas? Logi sisse. </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      name: "",
      email: "",
      confirm_password: "",
    };
  },
  methods: {
    ...mapActions(["register"]),
    registerUser() {
      let user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
      };
      this.register(user).then((res) => {
        if (res.data.success) {
          this.$router.push("login");
        }
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
