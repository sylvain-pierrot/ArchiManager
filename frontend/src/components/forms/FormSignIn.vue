<template>
  <q-form @submit="login" @reset="onReset" class="row justify-center">
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
import { useQuasar } from "quasar";
import { api } from "../../boot/axios";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const $q = useQuasar();
const data = ref(null);

function login() {
  api
    .post("/api/login", {
      email: email.value,
      mot_de_passe: password.value,
    })
    .then((response) => {
      data.value = response.data;
      console.log(response.data);
      router.push({ name: "Dashboard" });
      $q.notify({
        type: "positive",
        position: "top-right",
        message: "Connexion réussie",
      });
    });
}
</script>

<style></style>
