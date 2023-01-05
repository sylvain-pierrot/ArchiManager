<template>
  <q-layout view="hHh Lpr lFf" v-if="user">
    <q-drawer
      :breakpoint="1024"
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      class="bg-secondary"
    >
      <q-item class="q-mb-md q-mt-lg row justify-center">
        <img
          class="logo"
          src="../assets/logo-archimanager.svg"
          alt="logo-archimanger"
        />
      </q-item>

      <q-separator inset class="bg-grey-9 q-mb-lg" />

      <div class="row justify-center q-gutter-sm">
        <q-chip>
          <q-avatar color="blue" text-color="white">
            {{ user.nom.charAt(0) }}
          </q-avatar>
          {{ `${user.nom} ${user.prenom}` }}
        </q-chip>
        <q-btn
          flat
          rounded
          color="white"
          label="Déconnexion"
          icon-right="logout"
          no-caps
          @click="logout"
          class="q-ml-sm"
        />
      </div>

      <q-separator inset class="bg-grey-9 q-mt-md q-mb-md" />

      <q-list padding>
        <NavigationLink
          v-for="(nav, index) in navs"
          :key="index"
          :nav="nav"
        ></NavigationLink>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-primary">
      <router-view />
    </q-page-container>

    <q-footer reveal-offset class="bg-secondary">
      <q-tabs v-model="tab" class="text-white" align="justify">
        <q-route-tab
          v-for="(nav, index) in navs"
          :key="index"
          :to="nav.path"
          exact
          :icon="nav.icon"
          class="q-pa-md"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { Cookies } from "quasar";
import NavigationLink from "../components/NavigationLink.vue";
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const userCookie = Cookies.get("user");
const user = ref({ nom: userCookie.nom, prenom: userCookie.prenom });
const isAdmin = ref(null);
const tab = ref("");
const navs = ref([
  {
    title: "Tableau de bord",
    icon: "space_dashboard",
    path: "/dashboard",
  },
  {
    title: "Projets",
    icon: "maps_home_work",
    path: "/projects",
  },
  {
    title: "Contacts",
    icon: "contacts",
    path: "/contacts",
  },
]);

const leftDrawerOpen = ref(false);

const logout = async () => {
  await userStore.logout();
  router.push({ name: "SignIn" });
};

onBeforeMount(async () => {
  isAdmin.value = await userStore.isAdmin();
  if (isAdmin.value.role_id === 1) {
    navs.value.push({
      title: "Espace admin",
      icon: "admin_panel_settings",
      path: "/admin",
    });
  }
});
</script>

<style>
.logo {
  width: 15em;
}
.dark-chip {
  color: #dddddd;
  background-color: #4d4d4d;
}

@media screen and (min-width: 1025px) {
  .q-footer {
    display: none;
  }
}
</style>
