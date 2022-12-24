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
    component: () => import("src/layouts/ProcessUserAccountLayout.vue"),
    children: [
      {
        path: "signin",
        name: "SignIn",
        component: () => import("src/pages/SignInPage.vue"),
      },
      {
        path: "signup",
        name: "SignUp",
        component: () => import("src/pages/SignUpPage.vue"),
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
