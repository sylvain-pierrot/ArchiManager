<template>
  <q-page padding>
    <q-card class="no-shadow">
      <q-card-section horizontal class="justify-between items-center">
        <q-card-section>
          <div class="text-overline text-warning">PROJETS</div>
          <div class="text-h4 text-dark">LP-2022-1 | Logement Narbonne</div>
        </q-card-section>
        <q-card-section>
          <q-badge color="green-9" size="md" label="En cours" />
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-tabs
        v-model="tab"
        dense
        class="text-grey-6"
        active-color="warning"
        indicator-color="warning"
        align="justify"
      >
        <q-tab name="summary" label="RÉSUMÉ" />
        <q-tab name="phases" label="PHASES" />
        <q-tab name="parcels" label="PARCELLES" />
        <q-tab name="files" label="FICHIERS" />
      </q-tabs>
    </q-card>

    <q-tab-panels v-model="tab">
      <q-tab-panel name="summary" class="q-pa-none q-mt-md">
        <TabSummaryProjectDetail />
      </q-tab-panel>

      <q-tab-panel name="phases" class="q-pa-none q-mt-md"> </q-tab-panel>

      <q-tab-panel name="parcels" class="q-pa-none q-mt-md"> </q-tab-panel>

      <q-tab-panel name="files" class="q-pa-none q-mt-md"> </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import TabSummaryProjectDetail from "../components/tabs/TabSummaryProjectDetail.vue";
import { ref } from "vue";

const tab = ref("summary");
</script>

<style scoped>
.q-tab-panels {
  background: none !important;
}
div.q-panel.scroll,
.q-tab-panels {
  overflow: visible !important;
}
</style>
