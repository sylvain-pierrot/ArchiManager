<template>
  <q-card>
    <q-card-section
      class="bg-warning justify-between items-center q-pa-xs"
      horizontal
    >
      <div class="text-subtitle1 text-white q-ml-sm">Ajouter un projet</div>
      <q-btn icon="close" flat round dense v-close-popup color="white" />
    </q-card-section>
    <q-card-section>
      <q-form
        @submit="$emit('project', project, tags_projects)"
        class="row q-col-gutter-sm"
      >
        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="project.titre"
          label="Titre"
          placeholder="Titre"
          flat
          class="col-12"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <!-- <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="id"
          label="ID projet"
          placeholder="ID projet"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
        /> -->

        <q-select
          outlined
          color="black"
          bg-color="primary"
          v-model="project.mission_id"
          :options="missions"
          label="Mission"
          placeholder="Mission"
          flat
          class="col-6"
          :rules="[(val) => !!val || 'Ce champs est requis']"
          lazy-rules
          emit-value
          map-options
        />

        <q-select
          outlined
          color="black"
          bg-color="primary"
          v-model="project.designation_id"
          :options="designations"
          label="Désignation"
          placeholder="Désignation"
          flat
          class="col-6"
          :rules="[(val) => !!val || 'Ce champs est requis']"
          lazy-rules
          emit-value
          map-options
        />

        <q-select
          outlined
          color="black"
          bg-color="primary"
          v-model="project.client_id"
          :options="clients_"
          label="Client"
          placeholder="Client"
          flat
          class="col-6"
          :rules="[(val) => !!val || 'Ce champs est requis']"
          lazy-rules
          emit-value
          map-options
        />

        <div class="row items-start q-mt-sm col-6">
          <q-btn
            outline
            color="warning"
            label="Nouveau Client"
            icon="add"
            size="12px"
            unelevated
            @click="dialog_client = true"
          />

          <q-dialog v-model="dialog_client">
            <FormAddClient @client="emitClient" />
          </q-dialog>
        </div>

        <q-input
          outlined
          type="number"
          min="0"
          color="black"
          bg-color="primary"
          v-model="project.surface_fonciere"
          label="Surface foncière"
          placeholder="Surface foncière"
          flat
          class="col-6"
          :rules="[(val) => (!!val && val > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="number"
          min="0"
          color="black"
          bg-color="primary"
          v-model="project.surface_indicative"
          label="Surface indicative"
          placeholder="Surface indicative"
          flat
          class="col-6"
          :rules="[(val) => (!!val && val > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="project.adresse"
          label="Adresse"
          placeholder="Adresse"
          flat
          class="col-8"
          :rules="[(val) => !!val || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="project.ville"
          label="Ville"
          placeholder="Ville"
          flat
          class="col-4"
          :rules="[(val) => !!val || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="date"
          color="black"
          bg-color="primary"
          v-model="project.date_debut"
          label="Date début"
          stack-label
          flat
          class="col-6"
          :rules="[(val) => !!val || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="date"
          color="black"
          bg-color="primary"
          v-model="project.date_fin"
          label="Date fin"
          stack-label
          flat
          class="col-6"
          :rules="[(val) => !!val || 'Ce champs est requis']"
          lazy-rules
        />

        <q-select
          outlined
          color="black"
          bg-color="primary"
          v-model="tags_projects"
          multiple
          :options="tags_"
          stack-label
          label="Tags"
          placeholder="Tags"
          flat
          class="col-6"
          :rules="[
            (val) => (!!val && val.length > 0) || 'Ce champs est requis',
          ]"
          lazy-rules
          emit-value
          map-options
        >
          <template v-slot:selected-item="scope">
            <q-chip
              removable
              dense
              @remove="scope.removeAtIndex(scope.index)"
              :tabindex="scope.tabindex"
              text-color="black"
              class="q-ma-none"
              :style="{ background: scope.opt.color }"
            >
              {{ scope.opt.label }}
            </q-chip>
          </template>
        </q-select>

        <div class="row items-start q-mt-sm col-6">
          <q-btn
            outline
            color="warning"
            label="Gérer les tags"
            icon="flag"
            size="12px"
            unelevated
            @click="dialog_tags = true"
          />

          <q-dialog v-model="dialog_tags">
            <TagsManager
              :tags="tags"
              @addTag="emitAddTag"
              @updateTag="emitUpdateTag"
            />
          </q-dialog>
        </div>

        <q-input
          outlined
          type="textarea"
          color="black"
          bg-color="primary"
          v-model="project.description"
          label="Description"
          placeholder="Description"
          flat
          class="col-12"
        />

        <div class="col-12 row justify-end">
          <q-btn
            type="submit"
            color="warning"
            label="CRÉER"
            size="12px"
            unelevated
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import TagsManager from "../TagsManager.vue";
import FormAddClient from "./FormAddClient.vue";
import { ref, defineProps, toRefs, defineEmits, computed } from "vue";

const props = defineProps({
  clients: {
    type: Array,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
});
const { clients, tags } = toRefs(props);
const dialog_client = ref(false);
const dialog_tags = ref(false);

// options inputs select
const tags_ = computed(() =>
  tags.value.map((tag) => {
    return {
      label: tag.label,
      value: tag.id,
      color: tag.color,
    };
  })
);
const clients_ = computed(() =>
  clients.value.map((client) => {
    return {
      label: client.nom,
      value: client.id,
    };
  })
);
const missions = ref([
  {
    label: "Complète",
    value: 1,
  },
  {
    label: "Partielle",
    value: 2,
  },
]);
const designations = ref([
  {
    label: "Usage personnel",
    value: 1,
  },
  {
    label: "Autre usage",
    value: 2,
  },
]);

// tags_projects
const tags_projects = ref([]);

// project
const project = ref({
  titre: "",
  surface_fonciere: "",
  surface_indicative: "",
  ville: "",
  adresse: "",
  date_debut: "",
  date_fin: "",
  description: "",
  mission_id: null,
  designation_id: null,
  statut_id: 1,
  client_id: null,
});

// emits
const emit = defineEmits(["client", "addTag"]);
function emitClient(client) {
  dialog_client.value = false;
  emit("client", client);
}
function emitAddTag(tag) {
  emit("addTag", tag);
}
function emitUpdateTag(tag) {
  emit("updateTag", tag);
}
</script>
