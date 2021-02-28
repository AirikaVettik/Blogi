<template>
  <div class="container">
    <h1>Blogi!</h1>

    <hr />

    <p class="error" v-if="error">{{ error }}</p>

    <div class="posts-container">
      <div
        class="posts"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
      >
        <h1 class="text">{{ post.title }}</h1>
        <p class="text">{{ post.post }}</p>
        <p class="text">Autor: {{ post.author }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Posts",
  data() {
    return {
      posts: {
        title: "",
        post: "",
        author: "",
      },
      error: "",
    };
  },

  async created() {
    const posts = await axios({
      url: "api/posts",
      method: "GET",
      headers: {},
    });
    this.posts = posts.data.allPosts.reverse();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 700px;
  margin: 0 auto;
  padding-top: 50px;
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
