<template>
  <q-layout view="hHh Lpr lFf">
    <q-drawer
      breakpoint="1024"
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      class="bg-dark"
    >
      <q-item class="q-mb-md q-mt-lg row justify-center">
        <img
          class="logo"
          src="../assets/logo-archimanager.svg"
          alt="logo-archimanger"
        />
      </q-item>

      <q-separator inset class="bg-grey-9 q-mb-lg" />

      <div class="row justify-center">
        <q-list class="column items-start">
          <q-item>
            <q-item-section>
              <q-chip size="xl" class="dark-chip">
                <q-avatar>
                  <img :src="image" />
                </q-avatar>
                <small>{{ nom }}</small>
              </q-chip>
            </q-item-section>
          </q-item>

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
        </q-list>
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

    <q-footer reveal-offset class="bg-dark">
      <q-tabs v-model="tab" class="text-white">
        <q-route-tab
          v-for="(nav, index) in navs"
          :key="index"
          :to="nav.path"
          exact
          :icon="nav.icon"
          :label="nav.title"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import NavigationLink from "../components/NavigationLink.vue";
import { api } from "../boot/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
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
const image = ref(require("../assets/logo-LP.png"));
const nom = ref("Loïc Pierrot");

function logout() {
  api.post("/api/logout", {}).then((response) => {
    console.log(response.data);
    router.push({ name: "Login" });
  });
}
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
