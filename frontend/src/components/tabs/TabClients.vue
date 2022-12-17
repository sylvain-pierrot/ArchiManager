<template>
  <div class="row">
    <div class="col-12">
      <q-card class="no-shadow full-height">
        <q-card-section>
          <div class="text-h6 text-dark">Clients</div>
          <div class="text-caption text-grey-7">
            Liste des clients de votre agence
          </div>
        </q-card-section>
        <q-card-section>
          <q-btn
            color="warning"
            label="Client"
            icon="add"
            unelevated
            class="q-mb-md"
            @click="dialog_client = true"
          />

          <q-dialog v-model="dialog_client">
            <FormAddClient />
          </q-dialog>

          <q-table
            :rows="rows"
            :columns="columns"
            row-key="id"
            :selected-rows-label="getSelectedString"
            v-model:selected="selected"
            flat
            bordered
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import FormAddClient from "../forms/FormAddClient.vue";
import { getCssVar } from "quasar";
import { ref } from "vue";

const dialog_client = ref(false);
const cancelEnabled = ref(false);

function getSelectedString() {
  return selected.value.length === 0
    ? ""
    : `${selected.value.length} record${
        selected.value.length > 1 ? "s" : ""
      } selected of ${rows.value.length}`;
}

const selected = ref([]);

const columns = ref([
  {
    name: "name",
    label: "Nom",
    field: "name",
    align: "left",
    sortable: true,
  },
  {
    name: "contactName",
    align: "center",
    label: "Nom du contact",
    field: "contactName",
    align: "left",
    sortable: true,
  },
  { name: "email", label: "Email", field: "email", sortable: true },
  { name: "phone", label: "Téléphone", field: "phone", sortable: true },
  { name: "city", label: "Ville", field: "city", sortable: true },
]);
const rows = ref([
  {
    name: "MARRILLAT",
    contactName: "MARRILLAT",
    email: "marrillat@marrillat.com",
    phone: "06 06 06 06 06",
    city: "Narbonne",
  },
  {
    name: "MARRILLAT",
    contactName: "MARRILLAT",
    email: "marrillat@marrillat.com",
    phone: "06 06 06 06 06",
    city: "Narbonne",
  },
  {
    name: "MARRILLAT",
    contactName: "MARRILLAT",
    email: "marrillat@marrillat.com",
    phone: "06 06 06 06 06",
    city: "Narbonne",
  },
  {
    name: "MARRILLAT",
    contactName: "MARRILLAT",
    email: "marrillat@marrillat.com",
    phone: "06 06 06 06 06",
    city: "Narbonne",
  },
]);

const options = ref({
  title: {
    text: "PROJETS",
    align: "left",
  },
  chart: {
    id: "apex-donut",
  },
  colors: [
    getCssVar("primary"),
    getCssVar("secondary"),
    getCssVar("negative"),
    getCssVar("accent"),
  ],
  markers: {
    size: 4,
    hover: {
      sizeOffset: 6,
    },
  },
  labels: ["Narbonne", "Paris", "Montpellier", "Toulouse"],
});
const series = ref([3, 1, 6, 5]);
</script>

<style></style>
