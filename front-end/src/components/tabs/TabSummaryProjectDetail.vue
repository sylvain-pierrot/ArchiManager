<template>
  <div class="row q-col-gutter-md">
    <div class="col-xs-12 col-md-5">
      <q-card class="no-shadow">
        <q-card-section>
          <div class="text-h6 text-dark">A propos</div>
          <div class="text-caption text-grey-7">
            Informations générales à propos du projet
          </div>
        </q-card-section>
        <q-card-section>
          <q-tabs
            breakpoint="0"
            v-model="tab"
            dense
            inline-label
            class="text-warning"
            active-color="warning"
            active-class="bg-warning-light"
            indicator-color="transparent"
            align="left"
          >
            <q-tab
              name="project"
              label="Projet"
              icon="maps_home_work"
              class="rounded-borders"
            />
            <q-tab
              name="client"
              label="Client"
              icon="person"
              class="q-ml-sm rounded-borders"
            />
          </q-tabs>

          <q-tab-panels v-model="tab">
            <q-tab-panel name="project" class="q-pa-none q-mt-md">
              <div
                v-for="(value, key) in project"
                :key="key"
                class="row justify-between full-width"
              >
                <div class="text-body1 text-dark">{{ key }}</div>
                <div class="text-body2 text-grey-7">{{ value }}</div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="client" class="q-pa-none q-mt-md">
              <div
                v-for="(value, key) in client"
                :key="key"
                class="row justify-between full-width"
              >
                <div class="text-body1 text-dark">{{ key }}</div>
                <div class="text-body2 text-grey-7">{{ value }}</div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-md-3">
      <q-card class="no-shadow">
        <q-card-section>
          <div class="text-h6 text-dark">Honoraire</div>
          <div class="text-caption text-grey-7">
            Résumé du projet d'honoraires
          </div>
        </q-card-section>
        <q-card-section>
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
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tab = ref("project");

const project = ref({
  "ID projet": "LP-2022-1",
  Mission: "Complète",
  Désignation: "Usage personnel",
  Ville: "Narbonne",
  Adresse: "37 rue Françoise Dolto",
  "Date de début": "16 mars 2022",
  "Date de fin": "1 décembre 2022",
  Tags: ["Expension", "Résidentiel", "Privé"],
});

const client = ref({
  Nom: "MARRILLAT",
  Contact: "MARRILLAT",
  Email: "marrillat@gmail.com",
  Téléphone: "07 78 55 61 36",
  Adresse: "2 rue des Tilleuls, Armissan",
});

const columns = ref([
  {
    name: "name",
    required: true,
    label: "Valide",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
  },
  {
    name: "amount",
    required: true,
    label: "",
    align: "right",
    field: "amount",
  },
]);

const rows = ref([
  {
    name: "Projet",
    amount: "1 000 EUR",
  },
  {
    name: "Total (HT)",
    amount: "1 000 EUR",
  },
  {
    name: "TVA (20%)",
    amount: "200 EUR",
  },
  {
    name: "Total (TTC)",
    amount: "1 200 EUR",
  },
]);
</script>

<style lang="scss">
.bg-warning-light {
  background-color: #f2c03736;
}
</style>
