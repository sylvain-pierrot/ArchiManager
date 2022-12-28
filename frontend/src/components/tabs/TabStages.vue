<template>
  <div class="row q-col-gutter-md">
    <div class="col-7">
      <q-card class="no-shadow full-height">
        <q-card-section>
          <div class="text-h6 text-dark">Phases</div>
          <div class="text-caption text-grey-7">
            Définir la répartition des frais du projet par phase
          </div>
        </q-card-section>
        <q-card-section>
          <div
            class="row justify-between items-center q-mb-md"
            v-if="stages.length < 1"
          >
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
            <q-btn
              color="warning"
              label="Appliquer phases"
              unelevated
              @click="dialog_confirm = true"
            />

            <q-dialog v-model="dialog_confirm">
              <q-card>
                <q-card-section class="column items-center">
                  <q-icon
                    name="warning"
                    color="yellow-9"
                    size="4rem"
                    class="q-mb-md"
                  />
                  <div class="text-h6 text-center">
                    Êtes-vous sûr de vouloir utiliser la bibliothèque de phases
                    MOP ?
                  </div>
                  <div class="row q-mt-md q-gutter-md">
                    <q-btn label="Annuler" color="grey" v-close-popup />
                    <q-btn label="OK" color="red" @click="emitMop" />
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>

          <q-table
            :rows="stages"
            :columns="columns"
            row-key="id"
            flat
            bordered
            hide-pagination
            @row-click="onRowClick"
            v-model:pagination="pagination"
          >
            <template v-slot:bottom-row>
              <q-td>
                <q-btn
                  label="Ajouter une phase"
                  icon="add"
                  color="warning"
                  unelevated
                  outline
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, toRefs } from "vue";

const props = defineProps({
  stages: {
    type: Array,
    required: true,
  },
});
const { stages } = toRefs(props);
const dialog_confirm = ref(false);
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
    field: (row) => row.label,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "code",
    label: "Code",
    align: "left",
    field: (row) => row.code,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "fees",
    label: "Honoraires",
    align: "right",
    field: (row) => row.honoraires,
    format: (val) => `${val}`,
    sortable: true,
  },
]);
const options = ref(["MOP", "Ajouter des phases manuellement"]);
const model = ref("MOP");

// emit MOP
const emit = defineEmits(["mop"]);
function emitMop() {
  dialog_confirm.value = false;
  const stages = createStageList();
  emit("mop", stages);
}

// function
function createStageList() {
  return [
    {
      code: "ESQ",
      label: "Etudes de croquis",
      honoraires: 0,
      description: "",
    },
    {
      code: "AVP",
      label: "Etudes de pré-projet",
      honoraires: 0,
      description: "",
    },
    {
      code: "APS",
      label: "Résumé d'étude de pré-projet",
      honoraires: 0,
      description: "",
    },
    {
      code: "APD",
      label: "Etude de projet final",
      honoraires: 0,
      description: "",
    },
    {
      code: "PRO",
      label: "Etude de projet",
      honoraires: 0,
      description: "",
    },
    {
      code: "EXE",
      label: "Etude d'exécution",
      honoraires: 0,
      description: "",
    },
    {
      code: "SYN",
      label: "Plans de synthèse",
      honoraires: 0,
      description: "",
    },
    {
      code: "VISA",
      label: "Visa pour les études d'exécution",
      honoraires: 0,
      description: "",
    },
    {
      code: "ACT",
      label: "Assistance pour l'attribution de contrats de travaux",
      honoraires: 0,
      description: "",
    },
    {
      code: "OPC",
      label: "Planification, pilotage, coordination",
      honoraires: 0,
      description: "",
    },
    {
      code: "DET",
      label: "Exécution de contrats de travaux",
      honoraires: 0,
      description: "",
    },
    {
      code: "AOR",
      label: "Assistance aux opérations de réception",
      honoraires: 0,
      description: "",
    },
    {
      code: "EP",
      label: "Etudes préliminaires",
      honoraires: 0,
      description: "",
    },
    {
      code: "DIA",
      label: "Etudes de diagnostic",
      honoraires: 0,
      description: "",
    },
  ];
}
</script>

<style lang="scss"></style>
