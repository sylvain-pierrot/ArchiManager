<template>
  <q-page class="column justify-center items-center" padding>
    <div class="text-h2 text-white q-mb-sm">Bienvenue !</div>
    <div class="text-h6 text-white q-mb-xl">
      Connectez-vous et commencez à gérer vos projets
    </div>
    <FormSignIn />
    <div class="text-subtitle2 text-white">Vous n'avez pas de compte ?</div>
    <q-btn
      flat
      style="color: #ff0080"
      label="Créez un compte"
      :to="{ name: 'SignUp' }"
    />
  </q-page>
</template>

<script setup>
import FormSignIn from "src/components/forms/FormSignIn.vue";
</script>

<style></style>
