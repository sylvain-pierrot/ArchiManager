<template>
  <q-page padding class="row justify-center items-center">
    <FormSignUp @user="userStore.createUser" :emails="emails" v-if="emails" />
  </q-page>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { onBeforeMount, ref } from "vue";
import FormSignUp from "src/components/forms/FormSignUp.vue";

const userStore = useUserStore();
const emails = ref(null);

onBeforeMount(async () => {
  const users = await userStore.getAllUsers();
  emails.value = users.map((user) => user.email);
});
</script>

<style>
.login-page {
  background-image: url(../assets/bg-rectangular.svg) !important;
  background-position: bottom !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}
</style>
