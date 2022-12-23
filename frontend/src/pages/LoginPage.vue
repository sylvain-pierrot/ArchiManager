<template>
  <q-page class="bg-dark column justify-center items-center login-page" padding>
    <q-img
      width="30em"
      src="../assets/logo-archimanager.svg"
      alt="logo archimanager"
      class="q-mb-xl"
    />
    <div class="text-h2 text-white q-mb-sm">Bienvenue !</div>
    <div class="text-h6 text-white q-mb-xl">
      Connectez-vous et commencez à gérer vos projets
    </div>
    <FormLogin></FormLogin>
  </q-page>
</template>

<script setup>
import FormLogin from "src/components/forms/FormLogin.vue";
</script>

<style>
.login-page {
  background-image: url(../assets/bg-rectangular.svg) !important;
  background-position: bottom !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}
</style>
