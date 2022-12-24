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

const signup = async (
  email,
  password,
  nationalnumber,
  name,
  firstname,
  tel
) => {
  await userStore.createUser(
    email,
    password,
    nationalnumber,
    name,
    firstname,
    tel
  );
  router.push({ name: "SignIn" });
};

onBeforeMount(async () => {
  const users = await userStore.getAllUsers();
  emails.value = users.map((user) => user.email);
});
</script>

<style></style>
