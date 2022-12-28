<template>
  <q-page padding v-if="project">
    <q-card class="no-shadow">
      <q-card-section horizontal class="justify-between items-center">
        <q-card-section>
          <div class="text-overline text-warning">PROJETS</div>
          <div class="text-h4 text-dark">
            {{ `${project.id} | ${project.titre} ${project.ville}` }}
          </div>
        </q-card-section>
        <q-card-section>
          <q-badge color="green-9" size="md" :label="project.statut" />
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-tabs
        v-model="tab"
        dense
        class="text-grey-6"
        active-color="warning"
        indicator-color="warning"
        align="justify"
      >
        <q-tab name="summary" label="RÉSUMÉ" />
        <q-tab name="phases" label="PHASES" />
        <q-tab name="parcels" label="PARCELLES" />
        <q-tab name="files" label="FICHIERS" />
      </q-tabs>
    </q-card>

    <q-tab-panels v-model="tab">
      <q-tab-panel name="summary" class="q-pa-none q-mt-md">
        <TabSummaryProjectDetail :project="project" :client="client" />
      </q-tab-panel>

      <q-tab-panel name="phases" class="q-pa-none q-mt-md"> </q-tab-panel>

      <q-tab-panel name="parcels" class="q-pa-none q-mt-md"> </q-tab-panel>

      <q-tab-panel name="files" class="q-pa-none q-mt-md"> </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import TabSummaryProjectDetail from "../components/tabs/TabSummaryProjectDetail.vue";
import { useProjectsStore } from "../stores/projects";
import { useClientsStore } from "../stores/clients";
import { useUserStore } from "../stores/user";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const moment = require("moment");
const userStore = useUserStore();
const clientsStore = useClientsStore();
const projectsStore = useProjectsStore();
const route = useRoute();
const tab = ref("summary");
const project = ref();
const client = ref();
const userCookie = decodeURIComponent(userStore.getCookie("user"));
const user = ref(JSON.parse(userCookie.substring(2)));

async function loadProject() {
  project.value = await projectsStore.getOneProject(route.params.id);
  client.value = await clientsStore.getOneClient(project.value.client_id);

  // project
  // edit value
  project.value.statut =
    project.value.statut_id === 1
      ? "En cours"
      : project.value.statut_id === 2
      ? "Terminé"
      : "Annulé";
  project.value.mission =
    project.value.mission_id === 1 ? "Complète" : "Partielle";
  project.value.designation =
    project.value.designation_id === 1 ? "Usage personnel" : "Autre usage";

  const dateDebut = new Date(project.value.date_debut);
  const dateFin = new Date(project.value.date_fin);
  project.value.date_debut = moment(dateDebut).format("DD/MM/YYYY");
  project.value.date_fin = moment(dateFin).format("DD/MM/YYYY");
  project.value.id = `${user.value.prenom
    .charAt(0)
    .toUpperCase()}${user.value.nom.charAt(0).toUpperCase()}-${moment(
    dateDebut
  ).format("YYYY")}-${project.value.id}`;

  // delete useless property
  if (project.value.description.length < 1) {
    delete project.value.description;
  }
  delete project.value.statut_id;
  delete project.value.client_id;
  delete project.value.architecte_id;
  delete project.value.mission_id;
  delete project.value.designation_id;

  // client
  delete client.value.id;
  delete client.value.architecte_id;
  if (client.value.notes.length < 1) {
    delete client.value.notes;
  }
}
onBeforeMount(async () => {
  await loadProject();
});
</script>

<style scoped>
.q-tab-panels {
  background: none !important;
}
div.q-panel.scroll,
.q-tab-panels {
  overflow: visible !important;
}
</style>
