<template>
  <q-card>
    <q-card-section
      class="bg-warning justify-between items-center q-pa-xs"
      horizontal
    >
      <div class="text-subtitle1 text-white q-ml-sm">Ajouter un client</div>
      <q-btn icon="close" flat round dense v-close-popup color="white" />
    </q-card-section>
    <q-card-section>
      <q-form @submit="onSubmit" @reset="onReset" class="row q-col-gutter-sm">
        <q-input
          outlined
          type="text"
          color="warning"
          bg-color="primary"
          v-model="clientName"
          label="Nom du client"
          placeholder="Nom du client"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
        />

        <q-input
          outlined
          type="text"
          color="warning"
          bg-color="primary"
          v-model="clientNameContact"
          label="Nom du contact"
          placeholder="Nom du contact"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
        />

        <q-input
          outlined
          type="email"
          color="warning"
          bg-color="primary"
          v-model="email"
          label="Email"
          placeholder="Email"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
        />

        <q-input
          outlined
          type="tel"
          color="warning"
          bg-color="primary"
          v-model="phone"
          label="Téléphone"
          placeholder="Téléphone"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
        />

        <q-input
          outlined
          type="tel"
          color="warning"
          bg-color="primary"
          v-model="address"
          label="Adresse"
          placeholder="Adresse"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
        />

        <q-input
          outlined
          type="textarea"
          color="warning"
          bg-color="primary"
          v-model="notes"
          label="Notes"
          placeholder="Notes"
          flat
          class="col-12"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
        />

        <div class="col-12 row justify-end">
          <q-btn
            color="warning"
            label="SAUVEGARDER"
            size="12px"
            unelevated
            @click="dialog_client = true"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";

const dialog_client = ref(false);

const clientName = ref("");
const clientNameContact = ref("");
const email = ref("");
const phone = ref(null);
const address = ref("");
const notes = ref("");

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
