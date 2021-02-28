<template>

  <div class="container">
    
    <h2>Muuda postitust!</h2>

          <div>
            <form>
              <div class>
                <label for="title">Pealkiri: </label>
                <input type="text" name="title" v-model="post.title"/>
              </div>

              <div>
                <textarea
                  type="text"
                  id="create-post"
                  v-model="post.post"
                  placeholder="Sinu mõtted">
                </textarea>
              </div>

              <div>
                <label for="author">Autor: </label>
                <input type="text" name="author" v-model="post.author"/> 
              </div>

              <button @click="updatePost">Muudan postitust!</button>
            </form>
          </div>

    <hr />
  </div>
</template>

<script>


export default {
  name: "updatePost",
  data() {
    return {
        post: {
          title: '',
          post: '',
          author: ''
        },
        error: ""
    }
  },
  methods: {

     getPost(id){
      console.log(id)
        this.$http.get('/api/posts/post/' + id)
            .then (function (response){
              this.post = response.body;
            });
    },

    updatePost() {

      let updatePost = {
        title: this.post.title,
        post: this.post.post,
        author: this.post.author
    }
      this.$http.put('api/posts/post/' + this.$route.params.id, updatePost)
        .then (function(){
          this.$router.push('/posts/')
        })
    }
  },
  created: function() {
    this.getPost(this.$route.params.id)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

div.container {
  max-width: 700px;
  margin: 0 auto;
  padding-top: 50px
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
  background-color: #e7d1ff ;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

p.text {
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 0;
}

</style>
