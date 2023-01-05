import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { useUserStore } from "../stores/user";
import { Cookies } from "quasar";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();

    if (!Cookies.has("user")) {
      if (to.name === "SignUp" || to.name === "SignIn") {
        next();
      } else {
        next({ name: "SignIn" });
      }
    } else if (to.name === "SignUp" || to.name === "SignIn") {
      next({ name: "Dashboard" });
    } else if (to.name === "Admin") {
      if (userStore.isAdmin) {
        next();
      } else {
        next({ name: "Dashboard" });
      }
    } else {
      next();
    }
  });

  return Router;
});
