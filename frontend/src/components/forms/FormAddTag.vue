<template>
  <q-card>
    <q-card-section
      class="bg-warning justify-between items-center q-pa-xs"
      horizontal
    >
      <div class="text-subtitle1 text-white q-ml-sm">Ajouter un tag</div>
      <q-btn icon="close" flat round dense v-close-popup color="white" />
    </q-card-section>
    <q-card-section>
      <q-form @submit="$emit('tag', tag)" class="row q-col-gutter-sm">
        <q-input
          outlined
          type="text"
          color="black"
          bg-color="primary"
          v-model="tag.label"
          label="Label"
          placeholder="Label"
          flat
          class="col-7"
          mask="A"
          reverse-fill-mask
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
        />

        <q-input
          outlined
          v-model="tag.color"
          type="text"
          color="black"
          label="Couleur"
          stack-label
          bg-color="primary"
          class="col-5"
          readonly
          :rules="[(val) => (val && val.length > 0) || 'Ce champs est requis']"
          lazy-rules
          :style="{ color: tag.color }"
        >
          <template v-slot:label>
            <q-chip
              text-color="black"
              class="q-ma-none"
              :style="{ background: tag.color }"
            >
              Couleur
            </q-chip>
          </template>
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-color v-model="tag.color" no-header />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <div class="col-12 row justify-end">
          <q-btn
            type="submit"
            color="warning"
            label="SAUVEGARDER"
            size="12px"
            unelevated
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";

const tag = ref({
  label: "",
  color: "",
});
</script>
