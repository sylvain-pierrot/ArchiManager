<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card class="no-shadow bg-warning">
          <q-card-section horizontal class="justify-between">
            <q-card-section>
              <div class="text-overline text-white">GÉNÉRAL</div>
              <div class="text-h4 text-dark">Tableau de bord</div>
            </q-card-section>

            <q-card-section>
              <div class="text-caption text-grey-7">
                Dernière connexion le 29/11/2022
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-6" v-for="(nav, index) in navs" :key="index">
        <q-card class="no-shadow bg-transparent card-nav">
          <q-item
            manual-focus
            :to="nav.path"
            class="flex justify-center q-pa-xl"
          >
            <q-item-section avatar class="q-pa-none column items-center">
              <q-icon color="secondary" size="3em" :name="nav.icon" />
              <q-item-label class="q-mt-sm text-grey-7">
                {{ nav.title }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-4">
        <q-card class="no-shadow">
          <q-card-section>
            <div class="text-h6 text-dark">Les derniers fichiers</div>
            <div class="text-caption text-grey-7">
              Résumé des fichiers téléchargés
            </div>
          </q-card-section>
          <q-card-section> </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-8">
        <q-card class="no-shadow">
          <q-card-section horizontal class="justify-between items-start">
            <q-card-section>
              <div class="text-h6 text-dark">Les derniers projets</div>
              <div class="text-caption text-grey-7">
                Résumé des derniers projets
              </div>
            </q-card-section>
            <q-card-section>
              <q-tabs
                breakpoint="0"
                v-model="project"
                dense
                :vertical="$q.screen.lt.sm"
                class="text-warning"
                active-color="warning"
                active-class="bg-warning-light"
                indicator-color="transparent"
              >
                <q-tab name="month" label="Mois" class="rounded-borders" />
                <q-tab
                  name="week"
                  label="Semaine"
                  class="q-ml-sm rounded-borders"
                />
                <q-tab
                  name="day"
                  label="Jour"
                  class="q-ml-sm rounded-borders"
                />
              </q-tabs>
            </q-card-section>
          </q-card-section>

          <q-card-section>
            <q-tab-panels v-model="project">
              <q-tab-panel name="month" class="q-pa-none q-mt-md">
                <q-table
                  :rows="rows"
                  :columns="columns"
                  row-key="id"
                  v-model:selected="selected"
                  flat
                  bordered
                  hide-pagination
                  @row-click="onRowClick"
                />
              </q-tab-panel>

              <q-tab-panel name="week" class="q-pa-none q-mt-md">
                <div>aaaaaaa</div>
              </q-tab-panel>

              <q-tab-panel name="day" class="q-pa-none q-mt-md">
                <div>pppppp</div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "../boot/axios";
import { ref } from "vue";

const $q = useQuasar();
const data = ref(null);

function loadData() {
  api.get("/api").then((response) => {
    data.value = response.data;
    console.log(response.data);
  });
  // .catch(() => {
  //   $q.notify({
  //     color: "negative",
  //     position: "top",
  //     message: "Loading failed",
  //     icon: "report_problem",
  //   });
  // });
}
loadData();

// const value = await axios.get("http://backend:5000/api");
// console.log(value);

const project = ref("month");
const navs = ref([
  {
    title: "Projets",
    icon: "maps_home_work",
    path: "/projects",
  },
  {
    title: "Contacts",
    icon: "contacts",
    path: "/contacts",
  },
  // {
  //   title: "Dossiers et documents",
  //   icon: "folder_copy",
  //   path: "/folders",
  // },
  // {
  //   title: "Mes revenus",
  //   icon: "paid",
  //   path: "/profile",
  // },
]);

const columns = ref([
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "project",
    label: "Projet",
    align: "left",
    field: "project",
    sortable: true,
  },
  {
    name: "status",
    label: "Statut",
    align: "right",
    field: "status",
    sortable: true,
  },
  {
    name: "fee",
    label: "Honoraire",
    align: "left",
    field: "fee",
    sortable: true,
  },
  {
    name: "files",
    label: "Fichiers désposés",
    field: "files",
  },
]);

const rows = ref([
  {
    id: "LP-2022-1",
    project: "Logement | Narbonne",
    status: "En attente",
    fee: "1 509 EUR",
    files: 3,
  },
  {
    id: "LP-2022-2",
    project: "Logement | Narbonne",
    status: "En attente",
    fee: "1 509 EUR",
    files: 3,
  },
  {
    id: "LP-2022-5",
    project: "Logement | Narbonne",
    status: "En attente",
    fee: "1 509 EUR",
    files: 3,
  },
  {
    id: "LP-2022-6",
    project: "Logement | Narbonne",
    status: "En attente",
    fee: "1 509 EUR",
    files: 3,
  },
  {
    id: "LP-2022-9",
    project: "Logement | Narbonne",
    status: "En attente",
    fee: "1 509 EUR",
    files: 3,
  },
]);
</script>

<style lang="scss" scoped>
.card-nav {
  transition: none;
  border: solid 1px #e0e0e8;

  .q-icon {
    background-color: #f0f7ff;
    border: solid 1px #e0e0e8;
    border-radius: 50%;
    padding: 10px !important;
  }
}
.card-nav:hover {
  box-shadow: 0 0 0 1px $warning;
  border-color: $warning;
  background-color: #fafafc !important;
}
</style>
