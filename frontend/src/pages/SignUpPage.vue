<template>
  <q-page padding class="row justify-center items-center">
    <FormSignUp @user="signup" :emails="emails" v-if="emails" />
  </q-page>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { onBeforeMount, ref } from "vue";
import FormSignUp from "src/components/forms/FormSignUp.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const emails = ref(null);

const signup = async (user) => {
  // name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  // firstname =
  //   firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();

  await userStore.createUser(user);
  router.push({ name: "SignIn" });
};

onBeforeMount(async () => {
  const users = await userStore.getAllUsers();
  emails.value = users.map((user) => user.email);
});
</script>

<style></style>
