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
      <q-form @submit="$emit('client', client)" class="row q-col-gutter-sm">
        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="client.nom"
          label="Nom du client *"
          placeholder="Nom du client"
          flat
          class="col-6"
          mask="A"
          reverse-fill-mask
          :rules="[
            (val) => (val && val.length > 0) || 'Ce champs est requis',
            (val) => (!!val && val.length < 255) || 'Trop de charactères',
          ]"
          lazy-rules
        />

        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="client.nom_contact"
          label="Nom du contact *"
          placeholder="Nom du contact"
          flat
          class="col-6"
          mask="A"
          reverse-fill-mask
          :rules="[
            (val) => (val && val.length > 0) || 'Ce champs est requis',
            (val) => (!!val && val.length < 255) || 'Trop de charactères',
          ]"
          lazy-rules
        />

        <q-input
          outlined
          type="email"
          color="black"
          bg-color="primary"
          v-model="client.email"
          label="Email *"
          placeholder="Email"
          flat
          class="col-6"
          :rules="[
            (val) => (val && isValidEmail(val)) || 'Ce champs est requis',
            (val) => (!!val && val.length < 255) || 'Trop de charactères',
          ]"
          lazy-rules
        />

        <q-input
          outlined
          type="tel"
          color="black"
          bg-color="primary"
          v-model="client.telephone"
          label="Téléphone *"
          placeholder="Téléphone"
          flat
          class="col-6"
          mask="##-##-##-##-##"
          :rules="[
            (val) =>
              (!!val && isValidPhoneNumber(val)) ||
              'Numéro de téléphone invalide',
            (val) => (!!val && val.length < 255) || 'Trop de charactères',
          ]"
          lazy-rules
        />

        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="client.adresse"
          label="Adresse *"
          placeholder="Adresse"
          flat
          class="col-6"
          :rules="[
            (val) => (val && val.length > 0) || 'Ce champs est requis',
            (val) => (!!val && val.length < 255) || 'Trop de charactères',
          ]"
          lazy-rules
        />

        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="client.ville"
          label="Ville *"
          placeholder="Ville"
          flat
          class="col-6"
          mask="A"
          reverse-fill-mask
          :rules="[
            (val) => (val && val.length > 0) || 'Ce champs est requis',
            (val) => (!!val && val.length < 255) || 'Trop de charactères',
          ]"
          lazy-rules
        />

        <q-input
          outlined
          type="textarea"
          color="black"
          bg-color="primary"
          v-model="client.notes"
          label="Notes"
          placeholder="Notes"
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

const client = ref({
  nom: "",
  nom_contact: "",
  email: "",
  adresse: "",
  ville: "",
  telephone: "",
  notes: "",
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
