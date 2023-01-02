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

          <q-table :rows="rows" :columns="columns" row-key="name" flat bordered>
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width />
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td auto-width>
                  <q-btn
                    size="sm"
                    color="warning"
                    round
                    dense
                    @click="props.expand = !props.expand"
                    :icon="props.expand ? 'remove' : 'add'"
                  />
                </q-td>
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
              <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                  <div class="text-left">
                    {{
                      props.row.notes === "" ? "Pas de notes." : props.row.notes
                    }}
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
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
  {
    name: "email",
    label: "Email",
    field: "email",
    align: "left",
    sortable: true,
  },
  {
    name: "address",
    label: "Adresse",
    field: "address",
    align: "center",
    sortable: true,
  },
  { name: "phone", label: "Téléphone", field: "phone", sortable: true },
  { name: "city", label: "Ville", field: "city", sortable: true },
]);
const rows = computed(() =>
  clients.value.map((client) => {
    return {
      name: client.nom,
      contactName: client.nom_contact,
      email: client.email,
      address: client.adresse,
      phone: client.telephone,
      city: client.ville,
      notes: client.notes,
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
