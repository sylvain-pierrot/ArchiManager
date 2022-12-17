<template>
  <div class="row">
    <div class="col-12">
      <q-card class="no-shadow full-height">
        <q-card-section>
          <div class="text-h6 text-dark">Projets</div>
          <div class="text-caption text-grey-7">Liste de tous les projets</div>
        </q-card-section>
        <q-card-section>
          <q-btn
            color="warning"
            label="Nouveau Projet"
            icon="add"
            unelevated
            class="q-mb-md"
            @click="dialog_project = true"
          />

          <q-dialog v-model="dialog_project">
            <FormAddProject />
          </q-dialog>

          <q-table
            :rows="rows"
            :columns="columns"
            row-key="id"
            :selected-rows-label="getSelectedString"
            selection="multiple"
            v-model:selected="selected"
            flat
            bordered
            @row-click="onRowClick"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import FormAddProject from "../forms/FormAddProject.vue";
import { getCssVar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const dialog_project = ref(false);
const cancelEnabled = ref(false);

function onRowClick(evt, row) {
  router.push(`/projects/${row.id}`);
}

function getSelectedString() {
  return selected.value.length === 0
    ? ""
    : `${selected.value.length} record${
        selected.value.length > 1 ? "s" : ""
      } selected of ${rows.value.length}`;
}

const selected = ref([]);
const columns = ref([
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "project",
    label: "Projet",
    align: "left",
    field: "project",
    sortable: true,
  },
  {
    name: "status",
    label: "Statut",
    align: "right",
    field: "status",
    sortable: true,
  },
  {
    name: "fee",
    label: "Honoraire",
    align: "left",
    field: "fee",
    sortable: true,
  },
  {
    name: "files",
    label: "Fichiers désposés",
    field: "files",
  },
]);

const rows = ref([
  {
    id: "LP-2022-1",
    project: "Logement | Narbonne",
    status: "En attente",
    fee: "1 509 EUR",
    files: 3,
  },
  {
    id: "LP-2022-2",
    project: "Logement | Narbonne",
    status: "En attente",
    fee: "1 509 EUR",
    files: 3,
  },
  {
    id: "LP-2022-5",
    project: "Logement | Narbonne",
    status: "En attente",
    fee: "1 509 EUR",
    files: 3,
  },
  {
    id: "LP-2022-6",
    project: "Logement | Narbonne",
    status: "En attente",
    fee: "1 509 EUR",
    files: 3,
  },
  {
    id: "LP-2022-9",
    project: "Logement | Narbonne",
    status: "En attente",
    fee: "1 509 EUR",
    files: 3,
  },
]);

const options = ref({
  title: {
    text: "PROJETS",
    align: "left",
  },
  chart: {
    id: "apex-donut",
  },
  colors: [
    getCssVar("primary"),
    getCssVar("secondary"),
    getCssVar("negative"),
    getCssVar("accent"),
  ],
  markers: {
    size: 4,
    hover: {
      sizeOffset: 6,
    },
  },
  labels: ["Narbonne", "Paris", "Montpellier", "Toulouse"],
});
const series = ref([3, 1, 6, 5]);
</script>

<style></style>
