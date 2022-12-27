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
            class="q-mb-md q-mr-md"
            @click="dialog_project = true"
          />

          <q-btn
            outline
            color="black"
            label="ACTIONS"
            icon-right="edit"
            class="q-mb-md"
            @click="dialog_project_edit = true"
            v-if="selected.length > 0"
          >
            <q-badge color="warning" floating rounded>{{
              selected.length
            }}</q-badge>
          </q-btn>

          <q-dialog v-model="dialog_project">
            <FormAddProject
              :clients="clients"
              :tags="tags"
              @project="emitProject"
              @client="emitClient"
              @tag="emitTag"
            />
          </q-dialog>

          <q-dialog v-model="dialog_project_edit">
            <FormEditProjects :tags="tags" @edit="emitEdit" />
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
import FormEditProjects from "../forms/FormEditProjects.vue";
import { ref, defineProps, toRefs, defineEmits, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  clients: {
    type: Array,
    required: true,
  },
});
const { projects, tags, clients } = toRefs(props);
const dialog_project = ref(false);
const dialog_project_edit = ref(false);
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
const rows = computed(() =>
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

// functions
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

// emits
const emit = defineEmits(["edit", "client", "project", "tag"]);

function emitEdit(obj) {
  dialog_project_edit.value = false;
  const projects_id = selected.value.map((project) => project.id);
  emit("edit", projects_id, obj);
}
function emitClient(client) {
  emit("client", client);
}
function emitProject(project) {
  dialog_project.value = false;
  emit("project", project);
}
function emitTag(tag) {
  emit("tag", tag);
}
</script>

<style></style>
