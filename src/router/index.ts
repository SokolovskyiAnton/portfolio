import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: ".is()",
    component: Home,
    meta: {
      title: "sokolovskyi.is",
    },
  },
  {
    path: "/about",
    name: ".about()",
    component: () => import("../views/About.vue"),
    meta: {
      title: "sokolovskyi.about",
    },
  },
  {
    path: "/:catchAll(.*)*",
    name: ".err(404)",
    component: () => import("../views/404.vue"),
    meta: {
      title: "sokolovskyi.err(404)",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string;
  next();
});

export default router;
