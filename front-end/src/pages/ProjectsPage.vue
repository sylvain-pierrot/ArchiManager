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
        <TabSummaryProjects />
      </q-tab-panel>

      <q-tab-panel name="projects" class="q-pa-none q-mt-md">
        <TabProjects />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import TabSummaryProjects from "../components/tabs/TabSummaryProjects.vue";
import TabProjects from "../components/tabs/TabProjects.vue";
import { ref } from "vue";

const tab = ref("summary");
const filter = ref("");
const columns = ref([
  {
    name: "reference",
    label: "Référence",
    field: "reference",
    align: "left",
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "Date",
    field: "date",
    align: "left",
    sortable: true,
  },
  { name: "surface", label: "Surface", field: "surface", sortable: true },
  { name: "commune", label: "Commune", field: "commune", sortable: true },
]);
const rows = ref([
  {
    reference: "LP-2022-027",
    date: "Novemebre 2022",
    nature: "Création d'un logement sur le garage d'une maison d'habitation",
    surface: 200,
    commune: "Narbonne",
    client: "MARRILLAT",
    icon: "face",
  },
  {
    reference: "LP-2022-020",
    date: "Novemebre 2022",
    nature: "Création d'un logement sur le garage d'une maison d'habitation",
    surface: 90,
    commune: "Narbonne",
    client: "LAPIN",
    icon: "face",
  },
  {
    reference: "LP-2022-017",
    date: "Novemebre 2022",
    nature: "Création d'un logement sur le garage d'une maison d'habitation",
    surface: 23,
    commune: "Gruissan",
    client: "CANAPA",
    icon: "face",
  },
  {
    reference: "LP-2022-007",
    date: "Novemebre 2022",
    nature: "Création d'un logement sur le garage d'une maison d'habitation",
    surface: 600,
    commune: "Paris",
    client: "SACADOS",
    icon: "face",
  },
]);
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
