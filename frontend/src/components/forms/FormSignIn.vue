<template>
  <q-form @submit="$emit('login', email, password)" class="row justify-center">
    <q-input
      standout="bg-warning"
      bg-color="grey-14"
      label-color="grey-13"
      type="text"
      v-model="email"
      label="Email"
      class="col-8 q-mb-sm text-white"
    />

    <q-input
      standout="bg-warning"
      bg-color="grey-14"
      label-color="grey-13"
      v-model="password"
      :type="isPwd ? 'password' : 'text'"
      label="Mot de passe"
      class="col-8 q-mb-lg text-white"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          color="dark"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

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

const isPwd = ref(true);
const email = ref("");
const password = ref("");
</script>

<style scoped></style>
