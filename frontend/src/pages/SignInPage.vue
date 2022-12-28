<template>
  <q-page class="column justify-center items-center" padding>
    <div class="text-h2 text-white q-mb-sm">Bienvenue !</div>
    <div class="text-h6 text-white q-mb-xl text-center">
      Connectez-vous et commencez à gérer vos projets
    </div>
    <FormSignIn @login="login" />
    <div class="text-subtitle2 text-white q-mt-md">
      Vous n'avez pas de compte ?
    </div>
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
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const login = async (email, password) => {
  await userStore.login(email, password);
  router.push({ name: "Dashboard" });
};
</script>

<style></style>
