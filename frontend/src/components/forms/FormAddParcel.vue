<template>
  <q-card>
    <q-card-section
      class="bg-warning justify-between items-center q-pa-xs"
      horizontal
    >
      <div class="text-subtitle1 text-white q-ml-sm">Ajouter une parcelle</div>
      <q-btn icon="close" flat round dense v-close-popup color="white" />
    </q-card-section>
    <q-card-section>
      <q-form @submit="$emit('parcel', parcel)" class="row q-col-gutter-sm">
        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="parcel.section"
          label="Section *"
          flat
          class="col-6"
          mask="A"
          reverse-fill-mask
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="parcel.numero"
          label="Numero *"
          flat
          class="col-6"
          mask="#"
          reverse-fill-mask
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="number"
          color="black"
          bg-color="primary"
          v-model="parcel.surface"
          label="Surface *"
          flat
          class="col-6"
          :rules="[(val) => !!val || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="textarea"
          color="black"
          bg-color="primary"
          v-model="parcel.urbanisme"
          label="Urbanisme"
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

const parcel = ref({
  section: null,
  numero: null,
  surface: null,
  urbanisme: "",
});

function isValidEmail(val) {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val);
}

function isValidPhoneNumber(phoneNumber) {
  const regex = /^\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/;
  return regex.test(phoneNumber);
}
</script>
