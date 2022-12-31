<template>
  <div class="row q-col-gutter-md">
    <div class="col-xs-12 col-md-4">
      <q-card class="no-shadow full-height">
        <q-card-section horizontal class="justify-between items-center">
          <q-card-section>
            <div class="text-h6 text-dark">Honoraires</div>
          </q-card-section>
          <q-card-section align="top">
            <div class="row items-center justify-center">
              <div class="text-h6 text-green q-mr-md">{{ `${billed} €` }}</div>
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
              <div class="text-h6 text-blue q-mr-md">{{ `${paid} €` }}</div>
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
              <div class="text-h6 text-red q-mr-md">{{ `${unpaid} €` }}</div>
              <q-btn flat round color="warning" icon="arrow_forward_ios" />
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-md-5">
      <q-card class="no-shadow q-mb-md">
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
                <div class="text-body2 text-grey-7">
                  {{ key === "statut" ? value.label : value }}
                </div>
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
            :height="100 + stages.length * 50"
            type="bar"
            :options="options"
            :series="series"
          ></apexchart>
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
const paid = computed(() => {
  let sum = 0;
  stages.value.forEach((stage) => {
    sum += stage.honoraires_paye;
  });
  return sum;
});
const unpaid = computed(() => {
  let sum = 0;
  stages.value.forEach((stage) => {
    sum += stage.honoraires - stage.honoraires_paye;
  });
  return sum;
});
const billed = computed(() => {
  let sum = 0;
  stages.value.forEach((stage) => {
    sum += stage.honoraires;
  });
  return sum;
});

const data = computed(() => {
  return stages.value.map((stage) => {
    return {
      x: "Payé",
      y: stage.honoraires_paye,
      goals: [
        {
          name: "Montant total",
          value: stage.honoraires,
          strokeColor: "#008ffb",
        },
      ],
    };
  });
});
const categories = computed(() => {
  return stages.value.map((stage) => stage.code);
});
const colors = computed(() => {
  return stages.value.map((stage) =>
    stage.honoraires_paye === stage.honoraires ? "#4caf50" : "#c10015"
  );
});
const series = ref([
  {
    name: "Payé",
    data: data,
  },
]);
const options = ref({
  chart: {
    type: "bar",
  },
  plotOptions: {
    bar: {
      barHeight: "90%",
      distributed: true,
      horizontal: true,
      dataLabels: {
        position: "bottom",
      },
    },
  },
  colors: colors,
  dataLabels: {
    enabled: true,
    textAnchor: "start",
    style: {
      colors: ["#fff"],
    },
    formatter: function (val, opt) {
      // return `${opt.w.globals.labels[opt.dataPointIndex]} : ${val} €`;
      return `Payé: ${val} €`;
    },
    offsetX: 0,
  },
  stroke: {
    width: 1,
    colors: ["#fff"],
  },
  yaxis: {
    labels: {
      show: true,
    },
  },
  xaxis: {
    categories: categories,
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
    position: "bottom",
    horizontalAlign: "center",
  },
});
</script>

<style lang="scss">
.bg-warning-light {
  background-color: #f0f7ff;
}
</style>
