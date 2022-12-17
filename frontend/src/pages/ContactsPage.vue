<template>
  <q-page padding>
    <q-card class="no-shadow">
      <q-card-section>
        <div class="text-overline text-warning">GÉNÉRAL</div>
        <div class="text-h4 text-dark">Contacts</div>
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
        <q-tab name="clients" label="CLIENTS" />
        <q-tab name="providers" label="PRESTATAIRES" />
      </q-tabs>
    </q-card>

    <q-tab-panels v-model="tab">
      <q-tab-panel name="clients" class="q-pa-none q-mt-md">
        <TabClients />
      </q-tab-panel>

      <q-tab-panel name="providers" class="q-pa-none q-mt-md">
        <TabProviders />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import TabClients from "../components/tabs/TabClients.vue";
import TabProviders from "../components/tabs/TabProviders.vue";
import { ref } from "vue";

const tab = ref("clients");
const filter = ref("");
</script>

<style lang="scss">
.q-tab-panels {
  background: none !important;
}
div.q-panel.scroll,
.q-tab-panels {
  overflow: visible !important;
}

.projet {
  border: solid 1px #e0e0e8;
  border-radius: 4px;
  margin-top: 10px;
  div {
    border-radius: 4px;
  }
  .project-icon {
    background-color: #f0f7ff;
    border: solid 1px #e0e0e8;
    border-radius: 50%;
    padding: 10px !important;
  }
  .project-width {
    width: 150px;
  }
}
.bg-projet {
  background-color: #145ba6;
}
.card-add {
  border-radius: 10px;
  border: 1px dashed #f2cb05;
  padding: 50px 50px 20px 50px;
}
.card-add:hover,
.projet:hover {
  box-shadow: 0 0 0 1px #f2cb05;
  border: solid 1px #f2cb05;
}
.q-field {
  max-width: 300px;
}
h1 {
  font-size: 4em;
  font-weight: bold;
}
</style>
