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
          emit-value
          map-options
        />

        <q-select
          outlined
          color="black"
          bg-color="primary"
          v-model="status.statut_id"
          :options="status_"
          label="Statut"
          flat
          class="col-12"
          :rules="[(val) => !!val || 'Ce champs est requis']"
          lazy-rules
          emit-value
          map-options
          v-if="field === 1"
        />

        <q-select
          outlined
          color="black"
          bg-color="primary"
          v-model="tags_projects"
          multiple
          :options="tags_"
          stack-label
          label="Tags"
          placeholder="Tags"
          flat
          class="col-6"
          :rules="[
            (val) => (!!val && val.length > 0) || 'Ce champs est requis',
          ]"
          lazy-rules
          emit-value
          map-options
          v-if="field === 2"
        >
          <template v-slot:selected-item="scope">
            <q-chip
              removable
              dense
              @remove="scope.removeAtIndex(scope.index)"
              :tabindex="scope.tabindex"
              text-color="black"
              class="q-ma-none"
              :style="{ background: scope.opt.color }"
            >
              {{ scope.opt.label }}
            </q-chip>
          </template>
        </q-select>

        <div class="col-12 row justify-end">
          <q-btn
            color="warning"
            type="submit"
            label="SAUVEGARDER"
            size="12px"
            unelevated
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

// choice
const field = ref(null);
const fields = ref([
  { label: "Statut", value: 1 },
  { label: "Tags", value: 2 },
]);
// tags
const tags_projects = ref([]);
const tags_ = computed(() =>
  tags.value.map((tag) => {
    return {
      label: tag.label,
      value: tag.id,
      color: tag.color,
    };
  })
);
// status
const status = ref({
  statut_id: null,
});
const status_ = ref([
  { label: "En cours", value: 1 },
  { label: "Terminé", value: 2 },
  { label: "Annulé", value: 3 },
]);

// emit value
const value = computed(() =>
  field.value === 1 ? status.value : tags_projects.value
);
</script>
<style scoped>
.q-field__native {
  color: black !important;
}
</style>
