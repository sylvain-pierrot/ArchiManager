<template>
  <q-page padding>
    <q-card class="no-shadow">
      <q-card-section>
        <div class="text-overline text-warning">GÉNÉRAL</div>
        <div class="text-h4 text-dark">Projets</div>
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
        <q-tab name="projects" label="PROJETS" />
      </q-tabs>
    </q-card>

    <q-tab-panels v-model="tab">
      <q-tab-panel name="summary" class="q-pa-none q-mt-md">
        <TabSummaryProjects
          :totalFees="totalFees"
          :totalFeesCollected="totalFeesCollected"
          :projectInProgress="projectInProgress"
          :projectCompleted="projectCompleted"
          :projectCancelled="projectCancelled"
          :cities="cities"
          :tags="tags"
        />
      </q-tab-panel>

      <q-tab-panel name="projects" class="q-pa-none q-mt-md">
        <TabProjects
          :projects="projects"
          :clients="clients"
          :tags="tags"
          @edit="updateProjects"
          @client="addClient"
          @project="addProject"
          @tag="addTag"
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import TabSummaryProjects from "../components/tabs/TabSummaryProjects.vue";
import TabProjects from "../components/tabs/TabProjects.vue";
import { ref, onBeforeMount } from "vue";
import { useProjectsStore } from "../stores/projects";
import { useClientsStore } from "../stores/clients";
import { useTagsStore } from "../stores/tags";

// tabs
const tab = ref("summary");

// stores
const clientsStore = useClientsStore();
const tagsStore = useTagsStore();
const projectsStore = useProjectsStore();

// clients store
const clients = ref([]);

// projects store
const totalFees = ref(0);
const totalFeesCollected = ref(0);
const projects = ref([]);
const projectInProgress = ref(0);
const projectCompleted = ref(0);
const projectCancelled = ref(0);
const cities = ref([]);

// tags store
const tags = ref([]);

// functions
async function loadTags() {
  tags.value = await tagsStore.getAllTags();
  console.log(tags.value);
}
async function loadClients() {
  clients.value = await clientsStore.getAllClients();
}
async function loadProjects() {
  // init
  projectInProgress.value = 0;
  projectCompleted.value = 0;
  projectCancelled.value = 0;
  cities.value = [];

  // projects
  projects.value = await projectsStore.getAllProjects();

  // sum
  totalFees.value = (await projectsStore.getTotalFees())[0].sum || 0;
  totalFeesCollected.value =
    (await projectsStore.getTotalFeesCollected())[0].sum || 0;

  projects.value.forEach((project) => {
    // cities
    const index = cities.value.findIndex((elem) => elem.city === project.ville);
    if (index === -1) {
      cities.value.push({ city: project.ville, serie: 1 });
    } else {
      cities.value[index].serie += 1;
    }

    // status
    switch (project.statut_id) {
      case 1:
        projectInProgress.value += 1;
        break;
      case 2:
        projectCompleted.value += 1;
        break;
      default:
        projectCancelled.value += 1;
    }
  });

  // tags store
  await loadTags();
}

// update: 1 => statut, 2 => tag
const updateProjects = async (projects_id, obj) => {
  for (const id of projects_id) {
    if (obj.attribut === 1) {
      await projectsStore.updateStatusId(id, obj.value);
    }
  }
  await loadProjects();
};

// create
const addClient = async (client) => {
  await clientsStore.createClient(client);
  await loadClients();
};
const addProject = async (project) => {
  await projectsStore.createProject(project);
  await loadProjects();
};
const addTag = async (label, color) => {
  await tagsStore.createTag(label, color);
  await loadTags();
};

// onMounted
onBeforeMount(async () => {
  await loadProjects();
  await loadClients();
  await loadTags();
});
</script>

<style lang="scss">
.q-tab-panels {
  background: none !important;
}
div.q-panel.scroll,
.q-tab-panels {
  overflow: visible !important;
}

.projet {
  border: solid 1px #e0e0e8;
  border-radius: 4px;
  margin-top: 10px;
  div {
    border-radius: 4px;
  }
  .project-icon {
    background-color: #f0f7ff;
    border: solid 1px #e0e0e8;
    border-radius: 50%;
    padding: 10px !important;
  }
  .project-width {
    width: 150px;
  }
}
.bg-projet {
  background-color: #145ba6;
}
.card-add {
  border-radius: 10px;
  border: 1px dashed #f2cb05;
  padding: 50px 50px 20px 50px;
}
.card-add:hover,
.projet:hover {
  box-shadow: 0 0 0 1px #f2cb05;
  border: solid 1px #f2cb05;
}
.q-field {
  max-width: 300px;
}
h1 {
  font-size: 4em;
  font-weight: bold;
}
</style>
