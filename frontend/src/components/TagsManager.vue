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
        row-key="label"
        flat
        bordered
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="label" :props="props">
              <div class="row">
                {{ props.row.label }}
                <q-popup-edit
                  v-model="props.row.label"
                  buttons
                  title="Label"
                  label-set="Valider"
                  label-cancel="Annuler"
                  @save="(newVal) => emitUpdateTag(props.row.id, newVal)"
                  v-slot="scope"
                  color="warning"
                >
                  <q-input
                    type="text"
                    v-model="scope.value"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                    color="black"
                    mask="A"
                    reverse-fill-mask
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Ce champs est requis',
                      (val) =>
                        (!!val && val.length < 255) || 'Trop de charactères',
                    ]"
                  />
                </q-popup-edit>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script setup>
import FormAddTag from "./forms/FormAddTag.vue";
import { ref, defineEmits, defineProps, toRefs } from "vue";

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
    name: "label",
    required: true,
    label: "Label",
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
