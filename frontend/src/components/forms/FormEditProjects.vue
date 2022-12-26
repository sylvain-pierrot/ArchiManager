<template>
  <q-card class="full-width">
    <q-card-section
      class="bg-warning justify-between items-center q-pa-xs"
      horizontal
    >
      <div class="text-subtitle1 text-white q-ml-sm">Modifier les projets</div>
      <q-btn icon="close" flat round dense v-close-popup color="white" />
    </q-card-section>
    <q-card-section>
      <q-form
        @submit="$emit('edit', { attribut: field, value: value })"
        class="row"
      >
        <q-select
          outlined
          color="black"
          bg-color="primary"
          v-model="field"
          :options="fields"
          label="Champ à modifier"
          flat
          class="col-12"
          :rules="[(val) => !!val || 'Ce champs est requis']"
          lazy-rules
        />

        <q-select
          outlined
          color="black"
          bg-color="primary"
          v-model="status_selected"
          :options="statusLabels"
          label="Statut"
          flat
          class="col-12"
          :rules="[(val) => !!val || 'Ce champs est requis']"
          lazy-rules
          v-if="field === 'Statut'"
        />

        <q-select
          outlined
          color="black"
          bg-color="primary"
          v-model="tag_selected"
          :options="tagsLabels"
          label="Tag"
          flat
          class="col-12"
          :rules="[(val) => !!val || 'Ce champs est requis']"
          lazy-rules
          v-if="field === 'Tags'"
        />

        <div class="col-12 row justify-end">
          <q-btn
            color="warning"
            type="submit"
            label="SAUVEGARDER"
            size="12px"
            unelevated
            v-close-popup
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, defineProps, toRefs, computed } from "vue";

const props = defineProps({
  tags: {
    type: Array,
    required: true,
  },
});
const { tags } = toRefs(props);
const field = ref(null);
const fields = ref(["Statut", "Tags"]);
// tags
const tag_selected = ref("");
const tagsLabels = computed(() => tags.value.map((tag) => tag.label));
// status
const status_selected = ref("");
const status = ref([
  { id: 1, label: "En cours" },
  { id: 2, label: "Terminé" },
  { id: 3, label: "Annulé" },
]);
const statusLabels = status.value.map((elem) => elem.label);
// value to return
const value = computed(() => {
  if (field.value === "Statut") {
    return status.value.find((elem) => status_selected.value === elem.label).id;
  } else {
    return tags.value.find((elem) => tag_selected.value === elem.label).id;
  }
});
</script>
<style>
.q-field__native {
  color: black !important;
}
</style>
