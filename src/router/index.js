import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/demo-1",
    name: "demo-1",
    component: () => import("../views/Demo-1.vue"),
  },
  {
    path: "/demo-2",
    name: "demo-2",
    component: () => import("../views/Demo-2.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
