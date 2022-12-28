<template>
  <q-item
    clickable
    :to="nav.path"
    active-class="text-warning bg-warning-light linked"
    class="text-primary link"
  >
    <q-item-section avatar>
      <q-icon :name="nav.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ nav.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  nav: {
    Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.bg-warning-light {
  background-color: #5892ad23;
}
.link {
  position: relative;
}
.linked::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: $warning;
}
</style>
