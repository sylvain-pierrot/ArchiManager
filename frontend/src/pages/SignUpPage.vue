<template>
  <q-page padding class="row justify-center items-center">
    <FormSignUp @user="userStore.createUser" />
  </q-page>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import FormSignUp from "src/components/forms/FormSignUp.vue";

const userStore = useUserStore();
// userStore.createUser();
</script>

<style>
.login-page {
  background-image: url(../assets/bg-rectangular.svg) !important;
  background-position: bottom !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}
</style>
