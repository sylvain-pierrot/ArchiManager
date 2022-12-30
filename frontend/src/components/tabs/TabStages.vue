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
              map-options
              emit-value
            />
            <q-btn
              color="warning"
              label="Appliquer phases"
              unelevated
              :disable="!model"
              @click="validate(model)"
            />

            <q-dialog v-model="dialog_confirm">
              <PopupConfirm :text="text_use_mop" @confirm="emitMop" />
            </q-dialog>
          </div>

          <q-table
            :rows="stages"
            :columns="columns"
            row-key="id"
            flat
            bordered
            hide-pagination
            v-model:pagination="pagination"
          >
            <template v-slot:bottom-row v-if="stages.length > 0">
              <q-td>
                <q-btn
                  label="Ajouter une phase"
                  icon="add"
                  color="warning"
                  unelevated
                  outline
                  @click="dialog_stage = true"
                />
              </q-td>
            </template>

            <template v-slot:body-cell-progress="props">
              <q-td>
                <div class="row justify-end">
                  <q-toggle
                    v-model="props.row.progression"
                    checked-icon="check"
                    color="green"
                    unchecked-icon="clear"
                    @update:model-value="
                      (newVal, evt) => emitProgress(props.row.id, newVal)
                    "
                  />
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-fees="props">
              <q-td>
                <div class="row justify-end">
                  {{ props.row.honoraires }}
                  <q-popup-edit
                    v-model="props.row.honoraires"
                    buttons
                    title="Honoraires"
                    label-set="Valider"
                    label-cancel="Annuler"
                    @save="(newVal) => emitUpdateFees(props.row.id, newVal)"
                    v-slot="scope"
                    color="warning"
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
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-paid="props">
              <q-td>
                <div class="row justify-end">
                  {{ props.row.honoraires_paye }}
                  <q-popup-edit
                    v-model="props.row.honoraires_paye"
                    buttons
                    title="Honoraires payés"
                    label-set="Valider"
                    label-cancel="Annuler"
                    :validate="(newVal) => newVal <= props.row.honoraires"
                    @save="(newVal) => emitUpdatePaid(props.row.id, newVal)"
                    v-slot="scope"
                    color="warning"
                  >
                    <q-input
                      type="text"
                      v-model.number="scope.value"
                      dense
                      autofocus
                      @keyup.enter="scope.set"
                      color="black"
                      :rules="[
                        (val) =>
                          (!!val && val <= props.row.honoraires) ||
                          'La valeur doit être inférieure ou égale aux honoraires',
                      ]"
                      lazy-rules
                    />
                  </q-popup-edit>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-btn="props">
              <q-td>
                <div class="row justify-end">
                  <q-btn icon="more_vert" color="secondary" flat rounded dense>
                    <q-menu>
                      <q-list style="min-width: 100px">
                        <q-item
                          clickable
                          @click="emitDeleteStage(props.row.id)"
                        >
                          <q-item-section avatar>
                            <q-avatar text-color="red" icon="delete" />
                          </q-item-section>
                          <q-item-section>Supprimer</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </q-td>
            </template>
          </q-table>

          <q-dialog v-model="dialog_stage">
            <FormAddStage @stage="emitStage" />
          </q-dialog>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, toRefs } from "vue";
import FormAddStage from "../forms/FormAddStage.vue";
import PopupConfirm from "../popups/PopupConfirm.vue";

const props = defineProps({
  stages: {
    type: Array,
    required: true,
  },
});
const text_use_mop = ref(
  "Êtes-vous sûr de vouloir utiliser la bibliothèque de phases MOP ?"
);
const { stages } = toRefs(props);
const dialog_confirm = ref(false);
const dialog_stage = ref(false);
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
    name: "progress",
    label: "Progression",
    align: "right",
  },
  {
    name: "fees",
    label: "Honoraires",
    align: "right",
    field: (row) => row.honoraires,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "paid",
    label: "Payé",
    align: "right",
    field: (row) => row.honoraires_paye,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "btn",
    label: "",
    align: "right",
  },
]);

const options = ref([
  { label: "MOP", value: 1 },
  { label: "Ajouter des phases manuellement", value: 2 },
]);
const model = ref();

// emit MOP
const emit = defineEmits([
  "mop",
  "stage",
  "deleteStage",
  "updateProgress",
  "updatePaid",
  "updateFees",
]);
function emitMop() {
  dialog_confirm.value = false;
  const stages = createStageList();
  emit("mop", stages);
}
function emitStage(stage) {
  dialog_stage.value = false;
  emit("stage", stage);
}
function emitDeleteStage(id) {
  emit("deleteStage", id);
}
function emitProgress(id, newVal) {
  const progress = { progression: newVal };
  emit("updateProgress", id, progress);
}
function emitUpdatePaid(id, newVal) {
  const paid = { honoraires_paye: newVal };
  emit("updatePaid", id, paid);
}
function emitUpdateFees(id, newVal) {
  const fees = { honoraires: newVal };
  emit("updateFees", id, fees);
}
// function
function validate(val) {
  if (val === 1) {
    dialog_confirm.value = true;
  } else {
    dialog_stage.value = true;
  }
}
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
