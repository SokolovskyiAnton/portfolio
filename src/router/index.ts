import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: ".is()",
    component: Home,
    meta: {
      title: "sokolovskyi.is",
      bodyClass: "home-page",
    },
  },
  {
    path: "/about",
    name: ".about()",
    component: () => import("../views/About.vue"),
    meta: {
      title: "sokolovskyi.about",
      bodyClass: "about-page",
    },
  },
  {
    path: "/:catchAll(.*)*",
    name: ".err(404)",
    component: () => import("../views/404.vue"),
    meta: {
      title: "sokolovskyi.err(404)",
      bodyClass: "error-page",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  window.scroll(0, 0);
  document.body.classList.remove("is-nav-open");
  document.title = to.meta.title as string;
  next();
});

export default router;
