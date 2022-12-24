<template>
  <q-form @submit="$emit('login', email, password)" class="row justify-center">
    <q-input
      standout="bg-warning text-white"
      bg-color="grey-14"
      label-color="grey-13"
      type="text"
      v-model="email"
      label="Email"
      class="col-8 q-mb-sm"
    />
    <q-input
      standout="bg-warning text-white"
      bg-color="grey-14"
      label-color="grey-13"
      type="text"
      v-model="password"
      label="Mot de passe"
      class="col-8 q-mb-lg"
    />

    <q-btn
      unelevated
      size="md"
      label="Se connecter"
      type="submit"
      color="warning"
      class="col-8"
    />
  </q-form>
</template>
<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
</script>

<style></style>
