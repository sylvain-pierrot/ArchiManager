<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-card class="no-shadow full-height">
        <q-card-section>
          <div class="text-h6 text-dark">Phases</div>
          <div class="text-caption text-grey-7">
            Définir la répartition des frais du projet par phase
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row justify-between items-center q-mb-md">
            <q-select
              outlined
              color="black"
              v-model="model"
              :options="options"
              stack-label
              label="Ensembles de phases prédéfinis"
              flat
              class="col-4"
            />
            <q-btn color="warning" label="Appliquer phases" unelevated />
          </div>

          <q-table
            :rows="rows"
            :columns="columns"
            row-key="id"
            :selected-rows-label="getSelectedString"
            selection="multiple"
            v-model:selected="selected"
            flat
            bordered
            @row-click="onRowClick"
            v-model:pagination="pagination"
          >
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selected = ref([]);
const pagination = ref({
  rowsPerPage: 0,
});
const columns = ref([
  {
    name: "label",
    required: true,
    label: "Label",
    align: "left",
    sortable: true,
  },
  {
    name: "code",
    label: "Code",
    align: "left",
    field: "code",
    sortable: true,
  },
  {
    name: "fees",
    label: "Honoraires",
    align: "right",
    field: "fees",
    sortable: true,
  },
]);
const options = ref(["MOP", "Ajouter des phases manuellement"]);
const model = ref("MOP");
</script>

<style lang="scss"></style>
