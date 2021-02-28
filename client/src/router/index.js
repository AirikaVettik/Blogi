
import Vue from "vue";
import VueRouter from "vue-router";
import Blogi from "../views/Blogi.vue";
import Login from "../views/Login.vue";
import Posts from "../views/Posts.vue";
import Register from "../views/Register.vue";
import EditPost from "../views/EditPost.vue";
import store from '../store'

Vue.use(VueRouter);

const routes = [
    {
      path: "/",
      name: "Blogi",
      component: Blogi,
      meta: { 
        requiresGuest: true},
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { 
        requiresGuest: true},
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { 
        requiresGuest: true }
    },
    {
      path: "/posts",
      name: "Postitused",
      component: Posts,
      meta: { 
        requiresAuth: true},
    },
    {
      path: "/editpost/:id",
      name: "Muuda",
      component: EditPost,
      meta: { 
        requiresAuth: true},
    },
  ];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.isLoggedIn) {
        // Redirect to the Login Page
        next('/');
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
      if (store.getters.isLoggedIn) {
        // Redirect to the Login Page
        next('/posts');
      } else {
        next();
      }
    } else {
      next()
    }
  });

export default router;