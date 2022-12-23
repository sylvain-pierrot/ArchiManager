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
      class="col-12 text-white"
      :rules="[(val) => isValidEmail(val) || 'Email invalide']"
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
      class="col-12 text-white"
      :rules="[(val) => val.length >= 5 || 'Mot de passe trop court']"
    />

    <q-btn
      unelevated
      size="md"
      label="Se connecter"
      type="submit"
      color="warning"
      class="col-12"
    />
  </q-form>
</template>
<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { api } from "../../boot/axios";
import { Cookies } from "quasar";

const email = ref("");
const password = ref("");

function isValidEmail(val) {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || "Invalid email";
}

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
    });
  // .catch(() => {
  //   $q.notify({
  //     color: "negative",
  //     position: "top",
  //     message: "Loading failed",
  //     icon: "report_problem",
  //   });
  // });
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
