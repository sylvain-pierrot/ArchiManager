<template>
  <q-card>
    <q-card-section
      class="bg-warning justify-between items-center q-pa-xs"
      horizontal
    >
      <div class="text-subtitle1 text-white q-ml-sm">Gérer les tags</div>
      <q-btn icon="close" flat round dense v-close-popup color="white" />
    </q-card-section>
    <q-card-section>
      <q-btn
        color="warning"
        label="Tag"
        icon="add"
        size="12px"
        unelevated
        @click="dialog_tag = true"
        class="q-mb-md"
      />

      <q-dialog v-model="dialog_tag">
        <FormAddTag @tag="emitAddTag" />
      </q-dialog>

      <q-table
        :rows="tags"
        :columns="columns"
        :rows-per-page-options="[]"
        row-key="name"
        flat
        bordered
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.label }}
              <q-popup-edit
                v-model="props.row.label"
                buttons
                label-set="Save"
                label-cancel="Close"
                :validate="(newVal) => emitUpdateTag(props.row.id, newVal)"
                v-slot="scope"
                color="red"
              >
                <q-input
                  type="text"
                  v-model.number="scope.value"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                  color="black"
                />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script setup>
import FormAddTag from "./forms/FormAddTag.vue";
import { ref, defineEmits, defineProps, toRefs, computed } from "vue";

const props = defineProps({
  tags: {
    type: Array,
    required: true,
  },
});
const { tags } = toRefs(props);
const dialog_tag = ref(false);

const columns = ref([
  {
    name: "name",
    required: true,
    label: "Nom",
    align: "left",
    field: (row) => row.label,
    format: (val) => `${val}`,
    sortable: true,
  },
]);

// emits
const emit = defineEmits(["tag"]);

function emitAddTag(tag) {
  dialog_tag.value = false;
  emit("addTag", tag);
}
function emitUpdateTag(id, label) {
  emit("updateTag", { id: id, label: label });
}
</script>
