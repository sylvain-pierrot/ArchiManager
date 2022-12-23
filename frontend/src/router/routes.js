const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("src/pages/DashboardPage.vue"),
      },
      {
        path: "projects",
        component: () => import("pages/ProjectsPage.vue"),
      },
      {
        path: "projects/:id",
        component: () => import("pages/ProjectDetailPage.vue"),
        props: true,
      },
      {
        path: "contacts",
        component: () => import("src/pages/ContactsPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/AccountLayout.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("src/pages/LoginPage.vue"),
      },
      {
        path: "createaccount",
        name: "CreateAccount",
        component: () => import("src/pages/CreateAccountPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
