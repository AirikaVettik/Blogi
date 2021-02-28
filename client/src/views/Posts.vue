<template>
  <div class="container">
    <div>
      <h1>Tere tulemast, {{ user.name }}!</h1>
    </div>

    <h2>Kirjuta uus postitus!</h2>

    <div>
      <form>
        <div class>
          <label for="title">Pealkiri: </label>
          <input type="text" name="title" v-model="post.title" />
        </div>

        <div>
          <textarea
            type="text"
            id="create-post"
            v-model="post.post"
            placeholder="Sinu mõtted"
          >
          </textarea>
        </div>

        <div>
          <label for="author">Autor: </label>
          <input type="text" name="author" v-model="post.author" />
        </div>

        <button @click="createPost">Lisan uue postituse!</button>
      </form>
    </div>

    <hr />

    <p class="error" v-if="error">{{ error }}</p>

    <div class="post">
      <div class="posts" v-for="post in posts" v-bind:key="post._id">
        <h1 class="text">{{ post.title }}</h1>
        <p class="text">{{ post.post }}</p>
        <p class="text">Autor: {{ post.author }}</p>

        <button><router-link v-bind:to="'/editpost/' + post._id">Muuda</router-link></button>
        <button @click="deletePost(post._id, post.index)">Kustuta</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Post",
  data() {
    return {
      posts: {},
      post: {
        title: "",
        post: "",
        author: "",
      },
      error: "",
    };
  },

  computed: mapGetters(["user"]),

  async created() {
    const posts = await axios({
      url: "api/posts/",
      method: "GET",
      headers: {},
    });
    this.posts = posts.data.allPosts.reverse();
    this.getProfile();
  },

  methods: {
    ...mapActions(["getProfile"]),

    createPost() {
      let newPost = {
        title: this.post.title,
        post: this.post.post,
        author: this.post.author,
      };
      this.submitToServer(newPost);
    },
    submitToServer(data) {
      axios
        .post("api/posts/post", data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    deletePost(id, index) {
      axios
        .delete("/api/posts/" + id)
        .then(() => {
          this.posts.splice(index, 1);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
};
</script>

<style scoped>
div.container {
  max-width: 700px;
  margin: 0 auto;
  padding-top: 50px;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input {
  width: 60%;
  border: 0;
  background-color: #f2f2f2;
  padding: 10px;
  margin: 15px;
  border-radius: 30px;
  box-shadow: 0 10px 10px rgb(0 0 0 / 20%);
}

textarea {
  width: 75%;
  resize: vertical;
  padding: 15px;
  border-radius: 10px;
  border: 0;
  background-color: #f2f2f2;
  height: 150px;
  margin: 15px;
  box-shadow: 0 10px 10px rgb(0 0 0 / 20%);
}

button {
  background-color: #f2f2f2;
  color: #363636;
  padding: 12px 20px;
  cursor: pointer;
  border: 0;
  border-radius: 30px;
  margin: 5px;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.posts {
  position: relative;
  border: 1px solid black;
  background-color: #e7d1ff;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

p.text {
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 0;
}
</style>
