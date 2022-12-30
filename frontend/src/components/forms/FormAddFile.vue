<template>
  <q-card>
    <q-card-section
      class="bg-warning justify-between items-center q-pa-xs"
      horizontal
    >
      <div class="text-subtitle1 text-white q-ml-sm">Insérer un fichier</div>
      <q-btn icon="close" flat round dense v-close-popup color="white" />
    </q-card-section>
    <q-card-section>
      <q-form @submit="$emit('file', file)" class="row q-col-gutter-sm">
        <q-file
          color="black"
          bg-color="primary"
          v-model="file"
          outlined
          label="Taille maximal 5Mo (.pdf)"
          accept=".pdf"
          max-file-size="5000000"
          class="col-12"
          @rejected="onRejected"
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
import { Notify } from "quasar";

const file = ref();

function onRejected(rejectedEntries) {
  Notify.create({
    type: "negative",
    position: "top-right",
    message: `${rejectedEntries} le(s) fichier(s) n'ont pas passé les contraintes de validation`,
  });
}
</script>
