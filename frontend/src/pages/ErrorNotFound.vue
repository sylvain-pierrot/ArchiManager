<template>
  <div
    class="fullscreen bg-white text-white text-center q-pa-md column justify-center items-center"
  >
    <img src="../assets/page-not-found.svg" alt="image page not found" />
    <q-btn
      class="q-mt-xl"
      color="warning"
      text-color="white"
      unelevated
      to="/dashboard"
      label="Go Home"
      no-caps
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
});
</script>
