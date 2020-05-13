import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import ArtistsIndex from "../views/ArtistsIndex.vue";
import ArtistsShow from "../views/ArtistsShow.vue";
import ArtistsNew from "../views/ArtistsNew.vue";
import ArtistsEdit from "../views/ArtistsEdit.vue";
import ArtistsJoin from "../views/ArtistsJoin.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";
import Messages from "../views/Messages.vue";
import Posts from "../views/Posts.vue";
import PostsNew from "../views/PostsNew.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/artists", name: "artists", component: ArtistsIndex },
  { path: "/artists/:id/edit", name: "artists-edit", component: ArtistsEdit },
  { path: "/artists-new", name: "artists-new", component: ArtistsNew },
  { path: "/artists-join", name: "artists-join", component: ArtistsJoin },
  { path: "/artists/:id", name: "artists-show", component: ArtistsShow },
  { path: "/users/:id", name: "users-show", component: UsersShow },
  { path: "/users/:id/edit", name: "users-edit", component: UsersEdit },
  { path: "/messages", name: "messages", component: Messages },
  { path: "/posts", name: "posts", component: Posts },
  { path: "/posts-new", name: "posts-new", component: PostsNew },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
