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
            <FormAddClient @client="emitClient" />
          </q-dialog>

          <q-table :rows="rows" :columns="columns" row-key="id" flat bordered />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import FormAddClient from "../forms/FormAddClient.vue";
import { ref, defineEmits, computed, defineProps, toRefs } from "vue";

const emit = defineEmits(["client"]);
const props = defineProps({
  clients: {
    type: Array,
    required: true,
  },
});
const { clients } = toRefs(props);
const dialog_client = ref(false);
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
const rows = computed(() =>
  clients.value.map((client) => {
    return {
      name: client.nom,
      contactName: client.nom_contact,
      email: client.email,
      phone: client.telephone,
      city: client.ville,
    };
  })
);

// functions
function emitClient(client) {
  dialog_client.value = false;
  emit("client", client);
}
</script>

<style></style>
