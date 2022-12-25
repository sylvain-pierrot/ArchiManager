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
          :projectInPogress="projectInPogress"
          :projectCompleted="projectCompleted"
          :cities="cities"
          v-if="totalFees"
        />
      </q-tab-panel>

      <q-tab-panel name="projects" class="q-pa-none q-mt-md">
        <TabProjects :projects="projects" v-if="projects" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import TabSummaryProjects from "../components/tabs/TabSummaryProjects.vue";
import TabProjects from "../components/tabs/TabProjects.vue";
import { ref, onMounted } from "vue";
import { useProjectsStore } from "../stores/projects";

const projectsStore = useProjectsStore();
const totalFees = ref();
const projects = ref();
const projectInPogress = ref(0);
const projectCompleted = ref(0);
const cities = ref([]);
const tab = ref("summary");

onMounted(async () => {
  projects.value = await projectsStore.getAllProjects();
  totalFees.value = (await projectsStore.getTotalFees())[0].sum;
  projects.value.forEach((project) => {
    // cities
    const index = cities.value.findIndex((elem) => elem.city === project.ville);
    if (index === -1) {
      cities.value.push({ city: project.ville, serie: 1 });
    } else {
      cities.value[index].serie += 1;
    }
    // status
    if (project.statut_id === 1) {
      projectInPogress.value += 1;
    } else if (project.statut_id === 2) {
      projectCompleted.value += 1;
    }
  });
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
