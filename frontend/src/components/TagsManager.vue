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
        <FormAddTag @tag="emitTag" />
      </q-dialog>

      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        :selected-rows-label="getSelectedString"
        v-model:selected="selected"
        flat
        bordered
        hide-bottom
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th auto-width />
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
            <q-td auto-width>
              <q-btn size="sm" icon="more_vert" round dense flat />
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
const emit = defineEmits(["tag"]);

function emitTag(tag) {
  dialog_tag.value = false;
  emit("tag", tag);
}

const columns = ref([
  {
    name: "name",
    required: true,
    label: "Nom",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
]);

const rows = computed(() => {
  return tags.value.map((tag) => {
    return {
      name: tag.label,
    };
  });
});

function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    });
  }
}

function onReset() {
  name.value = null;
  age.value = null;
  accept.value = false;
}
</script>
