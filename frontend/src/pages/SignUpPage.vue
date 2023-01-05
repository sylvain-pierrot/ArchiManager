<template>
  <q-page padding class="row justify-center items-center">
    <FormSignUp @user="signup" />
  </q-page>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import FormSignUp from "src/components/forms/FormSignUp.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const signup = async (user) => {
  await userStore.createUser(user);
  router.push({ name: "SignIn" });
};
</script>

<style></style>
