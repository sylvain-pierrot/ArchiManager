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
      <q-form @submit="onSubmit" @reset="onReset" class="row q-col-gutter-sm">
        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="title"
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
          v-model="mission"
          :options="missions"
          label="Mission"
          placeholder="Mission"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-select
          outlined
          color="black"
          bg-color="primary"
          v-model="designation"
          :options="designations"
          label="Désignation"
          placeholder="Désignation"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-select
          outlined
          color="black"
          bg-color="primary"
          v-model="client"
          :options="clients"
          label="Client"
          placeholder="Client"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
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
            <FormAddClient />
          </q-dialog>
        </div>

        <q-input
          outlined
          type="number"
          min="0"
          color="black"
          bg-color="primary"
          v-model="landSurface"
          label="Surface foncière"
          placeholder="Surface foncière"
          flat
          class="col-6"
          :rules="[(val) => (val && val > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="number"
          min="0"
          color="black"
          bg-color="primary"
          v-model="indicativeSurface"
          label="Surface indicative"
          placeholder="Surface indicative"
          flat
          class="col-6"
          :rules="[(val) => (val && val > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="address"
          label="Adresse"
          placeholder="Adresse"
          flat
          class="col-8"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="city"
          label="Ville"
          placeholder="Ville"
          flat
          class="col-4"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="date"
          color="black"
          bg-color="primary"
          v-model="startDate"
          label="Date début"
          stack-label
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="date"
          color="black"
          bg-color="primary"
          v-model="endDate"
          label="Date fin"
          stack-label
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-select
          outlined
          color="black"
          bg-color="primary"
          v-model="tag"
          :options="tags"
          label="Tags"
          placeholder="Tags"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

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
            <TagsManager />
          </q-dialog>
        </div>

        <q-input
          outlined
          type="textarea"
          color="black"
          bg-color="primary"
          v-model="title"
          label="Description"
          placeholder="Description"
          flat
          class="col-12"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <div class="col-12 row justify-end">
          <q-btn color="warning" label="CRÉER" size="12px" unelevated />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import TagsManager from "../TagsManager.vue";
import FormAddClient from "./FormAddClient.vue";
import { useQuasar } from "quasar";
import { ref } from "vue";

const dialog_client = ref(false);
const dialog_tags = ref(false);

const title = ref("");
const id = ref("");
const client = ref(null);
const clients = ref(["Michel", "Arnaud", "Charley", "Alexandre"]);
const mission = ref(null);
const missions = ref(["complete", "partielle"]);
const designation = ref(null);
const designations = ref(["usage personnel", "autre usage"]);
const landSurface = ref(null);
const indicativeSurface = ref(null);
const city = ref("");
const address = ref("");
const startDate = ref(null);
const endDate = ref(null);
const tag = ref();
const tags = ref(["Expension", "Neuf", "Privé", "Public", "Résidentiel"]);

const $q = useQuasar();

const name = ref(null);
const age = ref(null);
const accept = ref(false);

function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    });
  }
}

function onReset() {
  name.value = null;
  age.value = null;
  accept.value = false;
}
</script>
