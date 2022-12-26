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
      <q-form
        @submit="
          $emit(
            'client',
            clientName,
            clientNameContact,
            email,
            address,
            city,
            phone,
            notes
          )
        "
        class="row q-col-gutter-sm"
      >
        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="clientName"
          label="Nom du client *"
          placeholder="Nom du client"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="clientNameContact"
          label="Nom du contact *"
          placeholder="Nom du contact"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="email"
          color="black"
          bg-color="primary"
          v-model="email"
          label="Email *"
          placeholder="Email"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="tel"
          color="black"
          bg-color="primary"
          v-model="phone"
          label="Téléphone *"
          placeholder="Téléphone"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="address"
          label="Adresse *"
          placeholder="Adresse"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="city"
          label="Ville *"
          placeholder="Ville"
          flat
          class="col-6"
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          type="textarea"
          color="black"
          bg-color="primary"
          v-model="notes"
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
            v-close-popup
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";

const clientName = ref("");
const clientNameContact = ref("");
const email = ref("");
const address = ref("");
const city = ref("");
const phone = ref();
const notes = ref("");
</script>
