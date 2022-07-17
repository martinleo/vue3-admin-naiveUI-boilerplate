import { createRouter, createWebHistory } from "vue-router";
import AppView from "../views/AppView.vue";
import LoginView from "../views/LoginView.vue";
import SampleView from "../views/SampleView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import { useAuth } from '../stores/auth';

const routes = [
    {
      path: "/app",
      name: "AppView",
      component: AppView,
      children: [{ path: "sample", name: "SampleView", component: SampleView }],
      meta: { protectedRoute: true },
    },
    { path: "/login", name: "LoginView", component: LoginView },
    { path: "/", redirect: { name: "SampleView" } },
    { path: "/:pathMatch(.*)*", component: NotFoundView, meta: { protectedRoute: true } },
  ]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

router.beforeEach((to, from, next) => {
  const auth = useAuth() // https://pinia.esm.dev/core-concepts/outside-component-usage.html#single-page-applications
  const isProtectedRoute = to.matched.some((item) => item.meta.protectedRoute);

  if (isProtectedRoute && auth.user.token === null) {
    next({ name: "LoginView" });
  } else {
    next();
  }
});

export default router;
