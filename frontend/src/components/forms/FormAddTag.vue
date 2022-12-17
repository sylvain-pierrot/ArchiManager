<template>
  <q-card>
    <q-card-section
      class="bg-warning justify-between items-center q-pa-xs"
      horizontal
    >
      <div class="text-subtitle1 text-white q-ml-sm">Ajouter un tag</div>
      <q-btn icon="close" flat round dense v-close-popup color="white" />
    </q-card-section>
    <q-card-section>
      <q-form @submit="onSubmit" @reset="onReset" class="row q-col-gutter-sm">
        <q-input
          outlined
          type="text"
          color="warning"
          bg-color="primary"
          v-model="tagName"
          label="Nom du tag"
          placeholder="Nom du tag"
          flat
          class="col-7"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
        />

        <q-input
          outlined
          v-model="color"
          :rules="['anyColor']"
          color="warning"
          label="Couleur"
          stack-label
          :style="`background-color: ${color}`"
          bg-color="primary"
          class="col-5"
        >
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-color v-model="color" no-header />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          outlined
          type="text"
          color="warning"
          bg-color="primary"
          v-model="tagName"
          label="Description"
          placeholder="Description"
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

const color = ref("");

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
