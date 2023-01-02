<template>
  <div class="row q-col-gutter-md">
    <div class="col-xs-12 col-sm-4">
      <q-card class="no-shadow full-height">
        <q-card-section horizontal>
          <q-card-section class="col-8">
            <div class="text-h6 text-dark">Projets en cours</div>
            <div class="text-caption text-grey-7">Projets initiées</div>
          </q-card-section>
          <q-card-section class="col-4" align="top">
            <div class="row items-center justify-center">
              <div class="text-h6 text-green q-mr-md">
                {{ projectInProgress }}
              </div>
              <q-btn flat round color="warning" icon="arrow_forward_ios" />
            </div>
          </q-card-section>
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
          <q-card-section class="col-4" align="top">
            <div class="row items-center justify-center">
              <div class="text-h6 text-blue q-mr-md">
                {{ projectCompleted }}
              </div>
              <q-btn flat round color="warning" icon="arrow_forward_ios" />
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-sm-4">
      <q-card class="no-shadow full-height">
        <q-card-section horizontal>
          <q-card-section class="col-8">
            <div class="text-h6 text-dark">Projets annulés</div>
            <div class="text-caption text-grey-7">
              Projets actuellement annulés
            </div>
          </q-card-section>
          <q-card-section class="col-4" align="top">
            <div class="row items-center justify-center">
              <div class="text-h6 text-red q-mr-md">
                {{ projectCancelled }}
              </div>
              <q-btn flat round color="warning" icon="arrow_forward_ios" />
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-sm-5">
      <q-card class="no-shadow q-mb-md">
        <q-card-section class="col-8">
          <div class="row justify-between">
            <div class="text-h6 text-dark q-mb-md">Honoraires payés</div>
            <div class="text-h6 text-warning q-mb-md">
              {{ `${totalFeesCollected}€ / ${totalFees}€` }}
            </div>
          </div>

          <q-linear-progress
            stripe
            size="10px"
            :value="progress1"
            color="warning"
            instant-feedback
            rounded
          />
          <div class="text-caption text-grey-7 q-mt-sm">
            Honoraires payés totaux des projets
          </div>
        </q-card-section>
      </q-card>

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
            v-model:pagination="pagination"
          />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-md-7">
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
import { ref, defineProps, toRefs, computed } from "vue";

const props = defineProps({
  totalFees: {
    type: Number,
    required: true,
  },
  totalFeesCollected: {
    type: Number,
    required: true,
  },
  projectInProgress: {
    type: Number,
    required: true,
  },
  projectCompleted: {
    type: Number,
    required: true,
  },
  projectCancelled: {
    type: Number,
    required: true,
  },
  cities: {
    type: Array,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
});
const {
  totalFees,
  totalFeesCollected,
  projectInProgress,
  projectCompleted,
  projectCancelled,
  cities,
  tags,
} = toRefs(props);

const progress1 = computed(() => {
  if (totalFees.value === 0) {
    return 0;
  } else {
    return parseFloat(totalFeesCollected.value / totalFees.value).toFixed(2);
  }
});
const pagination = ref({
  rowsPerPage: 0,
});
const columns = ref([
  {
    name: "name",
    required: true,
    label: "Tag",
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
const rows = computed(() => {
  return tags.value.map((tag) => {
    return {
      name: tag.label,
      projects: tag.occ,
    };
  });
});
const series = computed(() => cities.value.map((elem) => elem.serie));
const options = computed(() => {
  return {
    title: {
      text: "PROJETS",
      align: "left",
    },
    chart: {
      id: "apex-donut",
    },
    colors: [getCssVar("negative"), getCssVar("primary"), getCssVar("accent")],
    markers: {
      size: 4,
      hover: {
        sizeOffset: 6,
      },
    },
    labels: cities.value.map((elem) => elem.city),
  };
});
</script>

<style></style>
