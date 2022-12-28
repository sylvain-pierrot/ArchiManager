<template>
  <q-card>
    <q-card-section class="column items-center">
      <q-icon name="warning" color="yellow-9" size="4rem" class="q-mb-md" />
      <div class="text-h6 text-center">
        {{ text }}
      </div>
      <div class="row q-mt-md q-gutter-md">
        <q-btn label="Annuler" color="grey" v-close-popup />
        <q-btn label="OK" color="red" @click="$emit('confirm')" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
