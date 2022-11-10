import {
  createRouter,
  createWebHashHistory
} from "vue-router";

const routes = [{
  path: "/",
  redirect: "/open",
}, {
  path: "/desktop",
  name: "desktop",
  component: () => import("@/views/desktop.vue"),
}, {
  path: "/open",
  name: "open",
  component: () => import("@/views/open.vue"),
}, {
  path: "/calculator",
  name: "calculator",
  component: () => import("@/components/DeskApp/CalculatorApp.vue"),
}, ];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;