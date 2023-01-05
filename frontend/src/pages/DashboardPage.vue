<template>
  <q-page padding v-if="projects && clients && rows">
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
                breakpoint
                v-model="projectsByDate"
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
            <q-tab-panels v-model="projectsByDate">
              <q-tab-panel name="month" class="q-pa-none q-mt-md">
                <q-table
                  :rows="projectMonth"
                  :columns="columns"
                  row-key="id"
                  flat
                  bordered
                >
                  <template v-slot:body-cell-project="props">
                    <q-td key="name" :props="props">
                      <div class="text-subtitle1">
                        {{
                          `${props.row.project.titre} | ${props.row.project.ville}`
                        }}
                      </div>
                      <q-badge
                        v-for="(tag, index) in props.row.project.tags"
                        :key="index"
                        :style="{ background: tag.color }"
                      >
                        {{ tag.label }}
                      </q-badge>
                    </q-td>
                  </template>

                  <template v-slot:body-cell-status="props">
                    <q-td key="name" :props="props">
                      <div class="row no-wrap items-center">
                        <q-icon
                          size="xs"
                          :color="props.row.status.color"
                          :name="props.row.status.icon"
                        />

                        <div
                          class="text-subtitle1 q-ml-sm"
                          :style="{ color: props.row.status.color }"
                        >
                          {{ props.row.status.label }}
                        </div>
                      </div>
                    </q-td>
                  </template>
                </q-table>
              </q-tab-panel>

              <q-tab-panel name="week" class="q-pa-none q-mt-md">
                <q-table
                  :rows="projectWeek"
                  :columns="columns"
                  row-key="id"
                  flat
                  bordered
                >
                  <template v-slot:body-cell-project="props">
                    <q-td key="name" :props="props">
                      <div class="text-subtitle1">
                        {{
                          `${props.row.project.titre} | ${props.row.project.ville}`
                        }}
                      </div>
                      <q-badge
                        v-for="(tag, index) in props.row.project.tags"
                        :key="index"
                        :style="{ background: tag.color }"
                      >
                        {{ tag.label }}
                      </q-badge>
                    </q-td>
                  </template>

                  <template v-slot:body-cell-status="props">
                    <q-td key="name" :props="props">
                      <div class="row no-wrap items-center">
                        <q-icon
                          size="xs"
                          :color="props.row.status.color"
                          :name="props.row.status.icon"
                        />

                        <div
                          class="text-subtitle1 q-ml-sm"
                          :style="{ color: props.row.status.color }"
                        >
                          {{ props.row.status.label }}
                        </div>
                      </div>
                    </q-td>
                  </template>
                </q-table>
              </q-tab-panel>

              <q-tab-panel name="day" class="q-pa-none q-mt-md">
                <q-table
                  :rows="projectDay"
                  :columns="columns"
                  row-key="id"
                  flat
                  bordered
                  active-color="warning"
                  active-class="bg-warning-light"
                >
                  <template v-slot:body-cell-project="props">
                    <q-td key="name" :props="props">
                      <div class="text-subtitle1">
                        {{
                          `${props.row.project.titre} | ${props.row.project.ville}`
                        }}
                      </div>
                      <q-badge
                        v-for="(tag, index) in props.row.project.tags"
                        :key="index"
                        :style="{ background: tag.color }"
                      >
                        {{ tag.label }}
                      </q-badge>
                    </q-td>
                  </template>

                  <template v-slot:body-cell-status="props">
                    <q-td key="name" :props="props">
                      <div class="row no-wrap items-center">
                        <q-icon
                          size="xs"
                          :color="props.row.status.color"
                          :name="props.row.status.icon"
                        />

                        <div
                          class="text-subtitle1 q-ml-sm"
                          :style="{ color: props.row.status.color }"
                        >
                          {{ props.row.status.label }}
                        </div>
                      </div>
                    </q-td>
                  </template>
                </q-table>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { Cookies } from "quasar";
import { useProjectsStore } from "../stores/projects";
import { useClientsStore } from "../stores/clients";
import { useStagesStore } from "../stores/stages";
import { useTagsProjectsStore } from "../stores/tags_projects";
import { ref, onBeforeMount, computed } from "vue";

// tabs
const projectsByDate = ref("month");

// stores
const tagsProjectsStore = useTagsProjectsStore();
const clientsStore = useClientsStore();
const projectsStore = useProjectsStore();
const stagesStore = useStagesStore();

// datas
const moment = require("moment");
const user = Cookies.get("user");
const clients = ref(null);
const projects = ref(null);
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
]);
const rows = ref(null);
const columns = ref([
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.idShow,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "client",
    label: "Client",
    align: "left",
    field: "client",
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
    align: "left",
    field: "status",
    sortable: true,
  },
  {
    name: "fees",
    label: "Honoraires",
    align: "right",
    field: (row) => row.fees,
    format: (val) => `${val} €`,
    sortable: true,
  },
  {
    name: "files",
    label: "Fichiers désposés",
    field: "files",
  },
]);

const projectMonth = computed(() => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  return rows.value.filter((project) => project.date > oneMonthAgo);
});

const projectWeek = computed(() => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return rows.value.filter((project) => project.date > oneWeekAgo);
});

const projectDay = computed(() => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  return rows.value.filter((project) => project.date > oneDayAgo);
});

// functions
function getStatus(id) {
  const status = {
    label: "",
    icon: "",
    color: "",
  };
  if (id === 1) {
    status.label = "En cours";
    status.icon = "pending";
    status.color = "green";
  } else if (id === 2) {
    status.label = "Terminé";
    status.icon = "check_circle";
    status.color = "blue";
  } else {
    status.label = "Annulé";
    status.icon = "cancel";
    status.color = "red";
  }
  return status;
}
async function loadProjects() {
  const projectList = await projectsStore.getAllProjects();
  projects.value = await Promise.all(
    projectList.map(async (project) => {
      project.honoraires = (await stagesStore.getAllFees(project.id)) || 0;
      project.tags = await tagsProjectsStore.getAllTagsProject(project.id);
      return project;
    })
  );
}
async function loadClients() {
  clients.value = await clientsStore.getAllClients();
}

onBeforeMount(async () => {
  await loadProjects();
  await loadClients();

  rows.value = projects.value.map((project) => {
    return {
      id: project.id,
      idShow: `${user.prenom.charAt(0).toUpperCase()}${user.nom
        .charAt(0)
        .toUpperCase()}-${moment(new Date(project.date_debut)).format(
        "YYYY"
      )}-${project.id}`,
      client: clients.value.find((client) => client.id === project.client_id)
        .nom,
      project: project,
      status: getStatus(project.statut_id),
      fees: project.honoraires,
      files: 0,
      date: new Date(project.date_debut),
    };
  });
});
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
.bg-warning-light {
  background-color: #f0f7ff;
}
</style>
