<template>
  <q-card>
    <q-card-section
      class="bg-warning justify-between items-center q-pa-xs"
      horizontal
    >
      <div class="text-subtitle1 text-white q-ml-sm">Ajouter une phase</div>
      <q-btn icon="close" flat round dense v-close-popup color="white" />
    </q-card-section>
    <q-card-section>
      <q-form @submit="$emit('stage', stage)" class="row q-col-gutter-sm">
        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="stage.code"
          label="Code *"
          flat
          class="col-6"
          :rules="[
            (val) => !!val || 'Ce champs est requis',
            (val) => (!!val && val.length < 255) || 'Trop de charactères',
          ]"
          lazy-rules
        />

        <q-input
          outlined
          type="number"
          color="black"
          bg-color="primary"
          v-model="stage.honoraires"
          label="Honoraires *"
          flat
          class="col-6"
          :rules="[
            (val) => !!val || 'Ce champs est requis',
            (val) => (!!val && val > 0 && val < 99999) || 'Numéro invalide',
          ]"
          lazy-rules
        />

        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="stage.label"
          label="Label *"
          flat
          class="col-12"
          :rules="[
            (val) => !!val || 'Ce champs est requis',
            (val) => (!!val && val.length < 255) || 'Trop de charactères',
          ]"
          lazy-rules
        />

        <q-input
          outlined
          type="textarea"
          color="black"
          bg-color="primary"
          v-model="stage.description"
          label="Description"
          flat
          class="col-12"
        />

        <div class="col-12 row justify-end">
          <q-btn
            type="submit"
            color="warning"
            label="SAUVEGARDER"
            size="12px"
            unelevated
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";

const stage = ref({
  code: "",
  label: "",
  honoraires: null,
  description: "",
});
</script>
