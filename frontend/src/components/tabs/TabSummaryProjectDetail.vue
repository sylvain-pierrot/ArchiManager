<template>
  <div class="row q-col-gutter-md">
    <div class="col-xs-12 col-md-4">
      <q-card class="no-shadow full-height">
        <q-card-section class="col-8">
          <div class="row justify-between">
            <div class="text-h6 text-dark q-mb-sm">Progression</div>
            <div class="text-h6 text-warning q-mb-sm">
              {{ `${progress.label} %` }}
            </div>
          </div>

          <q-linear-progress
            stripe
            size="10px"
            :value="progress.number"
            color="warning"
            rounded
          />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-md-4">
      <q-card class="no-shadow full-height">
        <q-card-section horizontal class="justify-between items-center">
          <q-card-section>
            <div class="text-h6 text-dark">Facturé</div>
          </q-card-section>
          <q-card-section align="top">
            <div class="row items-center justify-center">
              <div class="text-h6 text-green q-mr-md">5400 €</div>
              <q-btn flat round color="warning" icon="arrow_forward_ios" />
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-md-4">
      <q-card class="no-shadow full-height">
        <q-card-section horizontal class="justify-between items-center">
          <q-card-section>
            <div class="text-h6 text-dark">Payé</div>
          </q-card-section>
          <q-card-section align="top">
            <div class="row items-center justify-center">
              <div class="text-h6 text-red q-mr-md">10540 €</div>
              <q-btn flat round color="warning" icon="arrow_forward_ios" />
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-md-4">
      <q-card class="no-shadow full-height">
        <q-card-section horizontal class="justify-between items-center">
          <q-card-section>
            <div class="text-h6 text-dark">Restant dû</div>
          </q-card-section>
          <q-card-section align="top">
            <div class="row items-center justify-center">
              <div class="text-h6 text-red q-mr-md">10540 €</div>
              <q-btn flat round color="warning" icon="arrow_forward_ios" />
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

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
                v-for="(value, key) of project"
                :key="key"
                class="row justify-between full-width"
              >
                <div class="text-body1 text-dark">
                  {{
                    key.charAt(0).toUpperCase() +
                    key.slice(1).toLowerCase().replace("_", " ")
                  }}
                </div>
                <div class="text-body2 text-grey-7">{{ value }}</div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="client" class="q-pa-none q-mt-md">
              <div
                v-for="(value, key) of client"
                :key="key"
                class="row justify-between full-width"
              >
                <div class="text-body1 text-dark">
                  {{
                    key.charAt(0).toUpperCase() +
                    key.slice(1).toLowerCase().replace("_", " ")
                  }}
                </div>
                <div class="text-body2 text-grey-7">{{ value }}</div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-md-7">
      <q-card class="no-shadow">
        <q-card-section>
          <div class="text-h6 text-dark">Honoraires</div>
          <div class="text-caption text-grey-7">
            Honoraires des phases du projet
          </div>
        </q-card-section>
        <q-card-section>
          <apexchart
            height="300"
            type="bar"
            :options="options"
            :series="series"
          ></apexchart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-xs-12 col-md-3">
      <q-card class="no-shadow">
        <q-card-section>
          <div class="text-h6 text-dark">Honoraires</div>
          <div class="text-caption text-grey-7">
            Honoraires des phases du projet
          </div>
        </q-card-section>
        <q-card-section>
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="name"
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
import { ref, defineProps, toRefs, computed } from "vue";

const tab = ref("project");
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  client: {
    type: Object,
    required: true,
  },
  stages: {
    type: Object,
    required: true,
  },
});
const { project, client, stages } = toRefs(props);
const columns = ref([
  {
    name: "name",
    required: true,
    label: "Projet",
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
    name: "Total (HT)",
    amount: "17 100 €",
  },
  {
    name: "TVA (20%)",
    amount: "0 €",
  },
  {
    name: "Total (TTC)",
    amount: "17 100 €",
  },
]);
const progress = computed(() => {
  let sum = 0;
  let progress = 0;
  stages.value.forEach((stage) => {
    progress += stage.progression === true ? 1 : 0;
    sum += 1;
  });
  return {
    label: parseFloat((progress / sum) * 100).toFixed(0),
    number: parseFloat(progress / sum).toFixed(2),
  };
});
const series = ref([
  {
    color: "#C23829",
    name: "Payé",
    data: [
      {
        x: "Payé",
        y: 2000,
        goals: [
          {
            name: "Montant total",
            value: 4400,
            strokeColor: "#3E8CF5 ",
          },
        ],
      },
      {
        x: "category B",
        y: 1500,
        goals: [
          {
            name: "Montant total",
            value: 5500,
            strokeColor: "#3E8CF5",
          },
        ],
      },
      {
        x: "category C",
        y: 3500,
        goals: [
          {
            name: "Montant total",
            value: 4100,
            strokeColor: "#3E8CF5",
          },
        ],
      },
      {
        x: "category D",
        y: 3700,
        goals: [
          {
            name: "Montant total",
            value: 3700,
            strokeColor: "#3E8CF5",
          },
        ],
      },
    ],
  },
]);
const options = ref({
  chart: {
    type: "bar",
    height: 350,
    stacked: false,
    stackType: "100%",
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  stroke: {
    width: 1,
    colors: ["#fff"],
  },
  xaxis: {
    categories: ["PH1", "PH2", "PH3", "PH4"],
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + "€";
      },
    },
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    offsetX: 40,
  },
});
</script>

<style lang="scss">
.bg-warning-light {
  background-color: #f2c03736;
}
</style>
