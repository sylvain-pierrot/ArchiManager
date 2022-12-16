<template>
  <div class="row q-col-gutter-md">
    <div class="col-xs-12 col-sm-4">
      <q-card class="no-shadow full-height">
        <q-card-section horizontal>
          <q-card-section class="col-8">
            <div class="text-h6 text-dark">Projets en cours</div>
            <div class="text-caption text-grey-7">Projets initiées</div>
          </q-card-section>
          <q-card-actions class="col-4" align="right">
            <div class="text-h6 text-blue q-mr-md">5</div>
            <q-btn flat round color="secondary" icon="arrow_forward_ios" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-sm-4">
      <q-card class="no-shadow full-height">
        <q-card-section horizontal>
          <q-card-section class="col-8">
            <div class="text-h6 text-dark">Projets terminés</div>
            <div class="text-caption text-grey-7">
              Projets actuellement achevés
            </div>
          </q-card-section>
          <q-card-actions class="col-4" align="right">
            <div class="text-h6 text-green q-mr-md">0</div>
            <q-btn flat round color="secondary" icon="arrow_forward_ios" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-sm-4">
      <q-card class="no-shadow fit">
        <q-card-section class="col-8">
          <div class="row justify-between">
            <div class="text-h6 text-dark q-mb-md">Honoraire</div>
            <div class="text-h6 text-warning q-mb-md">1 507 €</div>
          </div>

          <q-linear-progress
            stripe
            size="10px"
            :value="progress1"
            color="warning"
          />
          <div class="text-caption text-grey-7 q-mt-sm">
            Honoraires totaux des projets en attentes/terminés
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-md-6">
      <q-card class="no-shadow">
        <q-card-section>
          <div class="text-subtitle1 text-dark">Tags</div>
          <div class="text-caption text-grey-7 q-mb-md">
            Les tags vous aident à catégoriser vos projets
          </div>
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="name"
            flat
            bordered
            dense
            hide-bottom
          />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-md-6">
      <q-card class="no-shadow">
        <q-card-section>
          <div class="text-subtitle1 text-dark">Répartition</div>
          <div class="text-caption text-grey-7 q-mb-md">
            Répartition des projets selon la ville
          </div>
          <apexchart
            height="300"
            type="donut"
            :options="options"
            :series="series"
          ></apexchart>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { getCssVar } from "quasar";
import { ref } from "vue";

const progress1 = ref("0.6");
const columns = ref([
  {
    name: "name",
    required: true,
    label: "Nom",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "projects",
    required: true,
    label: "Projets",
    field: "projects",
    sortable: true,
  },
]);

const rows = ref([
  {
    name: "Résidentiel",
    projects: 6,
  },
  {
    name: "Privé",
    projects: 1,
  },
  {
    name: "Expansion",
    projects: 2,
  },
  {
    name: "Public",
    projects: 4,
  },
  {
    name: "Neuf",
    projects: 0,
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
