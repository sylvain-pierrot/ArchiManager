<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-card class="no-shadow full-height">
        <q-card-section>
          <div class="text-h6 text-dark">Parcelles</div>
          <div class="text-caption text-grey-7">
            Lister toutes les parcelles du terrain
          </div>
        </q-card-section>
        <q-card-section>
          <q-btn
            color="warning"
            label="Ajouter une parcelle"
            icon="add"
            unelevated
            class="q-mb-md q-mr-md"
            @click="dialog_parcel = true"
          />

          <q-dialog v-model="dialog_parcel">
            <FormAddParcel />
          </q-dialog>

          <q-list bordered separator class="rounded-borders"> </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import FormAddParcel from "../forms/FormAddParcel.vue";
import { ref } from "vue";

const dialog_parcel = ref(false);
</script>

<style lang="scss"></style>
