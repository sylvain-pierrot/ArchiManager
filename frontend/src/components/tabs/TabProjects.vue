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
import { ref, defineProps, toRefs } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
});
const { projects } = toRefs(props);
const router = useRouter();
const dialog_project = ref(false);
const cancelEnabled = ref(false);
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
const rows = ref(
  projects.value.map((project) => {
    return {
      id: project.id,
      project: `${project.titre} | ${project.ville}`,
      status: getStatus(project.statut_id),
      fee: "test",
      files: 0,
    };
  })
);

function getStatus(id) {
  return id === 1 ? "En cours" : id === 2 ? "Terminé" : "Annulé";
}
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
</script>

<style></style>
