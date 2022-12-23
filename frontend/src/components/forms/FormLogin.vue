<template>
  <q-form @submit="login" @reset="onReset" class="row justify-center">
    <q-input
      outlined
      type="text"
      color="warning"
      label-color="grey-13"
      bg-color="grey-14"
      v-model="email"
      label="Email"
      placeholder="Nom du tag"
      flat
      class="col-8 q-mb-xs text-white"
    />

    <q-input
      outlined
      type="text"
      color="warning"
      label-color="grey-13"
      bg-color="grey-14"
      v-model="password"
      label="Mot de passe"
      placeholder="Nom du tag"
      flat
      class="col-8 q-mb-lg text-white"
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

// function isValidEmail(val) {
//   const emailPattern =
//     /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
//   return emailPattern.test(val) || "Invalid email";
// }

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

<style>
.bg-input {
  background-color: #4d4d4d;
}
.text-input {
  color: #dddddd;
}
</style>
