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
            icon="add"
            unelevated
            class="q-mb-md q-mr-md"
            @click="dialog_file = true"
          />

          <q-dialog v-model="dialog_file">
            <FormAddFile @file="emitFile" />
          </q-dialog>

          <q-list bordered separator class="rounded-borders">
            <q-item v-if="files.length < 1" class="q-pa-md">
              <q-item-section avatar>
                <q-icon name="warning" color="secondary" size="32px" />
              </q-item-section>

              <q-item-section class="text-secondary">
                Pas de fichiers
              </q-item-section>
            </q-item>
            <q-item v-for="file in files" :key="file.id" class="q-pa-md">
              <q-item-section avatar top>
                <q-avatar
                  icon="insert_drive_file"
                  text-color="secondary"
                  class="bg-file"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ file.nom }}</q-item-label>
                <q-item-label caption>
                  {{ moment(file.date).locale("fr").format("D MMM YYYY") }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div>
                  <q-btn
                    round
                    text-color="secondary"
                    icon="visibility"
                    clickable
                    v-ripple
                    dense
                    unelevated
                    @click="previewFile(file)"
                  />
                </div>
              </q-item-section>

              <q-item-section side>
                <q-btn icon="more_vert" color="secondary" flat rounded dense>
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item clickable @click="emitDeleteFile(file.id)">
                        <q-item-section avatar>
                          <q-avatar text-color="red" icon="delete" />
                        </q-item-section>
                        <q-item-section>Supprimer</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog v-model="dialog_viewer">
      <q-pdfviewer
        v-model="visible"
        :src="pdfSrc"
        type="pdfjs"
        class="full-width"
      />
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, toRefs } from "vue";
import FormAddFile from "../forms/FormAddFile.vue";

const moment = require("moment");
const pdfSrc = ref();
const props = defineProps({
  files: {
    type: Array,
    required: true,
  },
});
const { files } = toRefs(props);
const dialog_viewer = ref(false);
const dialog_file = ref(false);

// functions
function previewFile(file) {
  const Buffer = require("buffer/").Buffer;

  // Create a new Blob object containing the file data
  const buffer = Buffer.from(file.fichier.data);
  const blob = new Blob([buffer], {
    type: file.type,
  });
  console.log(blob);

  const url = window.URL.createObjectURL(blob);
  pdfSrc.value = url; // where pdfSrc is used in the :src parameter of the qpdfviewer

  dialog_viewer.value = true;
  // // Create a new URL object pointing to the Blob
  // const url = URL.createObjectURL(blob);
  // // Create a new a element
  // const a = document.createElement("a");
  // // Set the href and download attributes
  // a.href = url;
  // a.download = "monFichier";
  // // Append the a element to the document
  // document.body.appendChild(a);
  // // Trigger a click event on the a element
  // a.click();
  // // Remove the a element from the document
  // document.body.removeChild(a);
}

// emit
const emit = defineEmits(["file", "deleteFile"]);

function emitFile(file) {
  dialog_file.value = false;
  emit("file", file);
}
function emitDeleteFile(id) {
  emit("deleteFile", id);
}
</script>

<style lang="scss">
.card-viewer,
.q-pdfviewer {
  max-width: 80% !important;
}
.bg-file {
  background-color: #f0f7ff;
  border: solid 1px #e0e0e8;
}
</style>
