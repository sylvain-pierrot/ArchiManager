<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-card class="no-shadow full-height">
        <q-card-section>
          <div class="text-h6 text-dark">Fichiers</div>
          <div class="text-caption text-grey-7">
            Conservez tous les dossiers importants du projet en un seul endroit
          </div>
        </q-card-section>
        <q-card-section>
          <q-btn
            color="warning"
            label="Ajouter un fichier"
            icon="insert_drive_file"
            unelevated
            class="q-mb-md q-mr-md"
            @click="dialog_file = true"
          />

          <q-dialog v-model="dialog_file">
            <FormAddFile @file="emitFile" />
          </q-dialog>

          <q-list bordered padding class="rounded-borders">
            <q-item
              v-for="file in files"
              :key="file.id"
              clickable
              v-ripple
              @click="downloadFile(file)"
            >
              <q-item-section avatar top>
                <q-avatar icon="assignment" color="grey" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">Expenses spreadsheet</q-item-label>
                <q-item-label caption>March 2nd, 2019</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, toRefs } from "vue";
import FormAddFile from "../forms/FormAddFile.vue";

const props = defineProps({
  files: {
    type: Array,
    required: true,
  },
});
const { files } = toRefs(props);

function downloadFile(file) {
  const Buffer = require("buffer/").Buffer;
  const buffer = Buffer.from(file.fichier.data);
  console.log(buffer);

  // Create a new Blob object containing the file data
  const blob = new Blob([buffer], {
    type: file.type,
  });
  console.log(blob);
  // Create a new URL object pointing to the Blob
  const url = URL.createObjectURL(blob);
  // Create a new a element
  const a = document.createElement("a");
  // Set the href and download attributes
  a.href = url;
  a.download = "monFichier";
  // Append the a element to the document
  document.body.appendChild(a);
  // Trigger a click event on the a element
  a.click();
  // Remove the a element from the document
  document.body.removeChild(a);
}

// emit
const emit = defineEmits(["file"]);

function emitFile(file) {
  dialog_file.value = false;
  emit("file", file);
}
const dialog_file = ref(false);
</script>

<style lang="scss"></style>
