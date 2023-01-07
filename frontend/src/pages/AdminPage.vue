<template>
  <q-page padding v-if="users">
    <q-card class="no-shadow q-mb-md">
      <q-card-section>
        <div class="text-overline text-warning">GÉNÉRAL</div>
        <div class="text-h4 text-dark">Espace admin</div>
      </q-card-section>
    </q-card>

    <q-card class="no-shadow">
      <q-card-section>
        <div class="text-h6 text-dark">Utilisateurs</div>
        <div class="text-caption text-grey-7">
          Liste de tous les utilisateurs
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn
          outline
          color="black"
          label="ACTIONS"
          icon-right="edit"
          class="q-mb-md"
          v-if="selected.length > 0"
        >
          <q-badge color="warning" floating rounded>{{
            selected.length
          }}</q-badge>

          <q-menu>
            <q-list style="min-width: 100px">
              <!-- <q-item clickable @click="dialog_user_edit = true">
                <q-item-section avatar>
                  <q-avatar text-color="amber-7" icon="edit" />
                </q-item-section>
                <q-item-section>Modifier</q-item-section>
              </q-item> -->

              <q-item clickable @click="dialog_confirm = true">
                <q-item-section avatar>
                  <q-avatar text-color="red" icon="delete" />
                </q-item-section>
                <q-item-section>Supprimer</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-dialog v-model="dialog_confirm">
          <PopupConfirm
            text="Êtes-vous sûr de vouloir supprimer le(s) utilisateur(s) ?"
            @confirm="deleteUsers"
          />
        </q-dialog>

        <q-table
          :rows="users"
          :columns="columns"
          row-key="id"
          selection="multiple"
          v-model:selected="selected"
          flat
          bordered
          v-model:pagination="pagination"
          @update:selected="
            (val) => (selected = selected.filter((u) => u.email != user.email))
          "
        >
          <template v-slot:body-cell-role="props">
            <q-td key="role" :props="props">
              <div class="row no-wrap items-center">
                <q-icon
                  size="xs"
                  :color="props.row.role.color"
                  :name="props.row.role.icon"
                />

                <div
                  class="text-subtitle1 q-ml-sm"
                  :style="{ color: props.row.role.color }"
                >
                  {{ props.row.role.label }}
                </div>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-status="props">
            <q-td key="name" :props="props">
              <div class="row items-center">
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
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { Cookies } from "quasar";
import PopupConfirm from "src/components/popups/PopupConfirm.vue";
import { useUserStore } from "src/stores/user";
import { ref, onBeforeMount } from "vue";

const dialog_confirm = ref(false);
const usersStore = useUserStore();
const users = ref(null);
const selected = ref([]);
const pagination = ref({
  rowsPerPage: 0,
});
const user = ref(Cookies.get("user"));
const columns = ref([
  {
    name: "role",
    label: "Rôle",
    align: "left",
    field: (row) => row.role,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "national_number",
    label: "Numéro national",
    align: "left",
    field: (row) => row.numero_national,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    label: "Nom",
    align: "left",
    field: (row) => row.nom,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "firstname",
    label: "Prénom",
    align: "left",
    field: (row) => row.prenom,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "email",
    label: "Email",
    align: "center",
    field: (row) => row.email,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "phone",
    label: "Téléphone",
    align: "right",
    field: (row) => row.telephone,
    format: (val) => `${val}`,
    sortable: true,
  },
]);

const deleteUsers = async () => {
  dialog_confirm.value = false;
  for (const user of selected.value) {
    console.log(user.id);
    await usersStore.deleteUser(user.id);
  }
  await loadUsers();
};

async function loadUsers() {
  users.value = await usersStore.getAllUsers();
  for (const user of users.value) {
    user.role =
      user.role_id === 2
        ? { label: "Utilisateur", icon: "account_circle", color: "blue" }
        : {
            label: "Administrateur",
            icon: "admin_panel_settings",
            color: "orange",
          };
    delete user.role_id;
  }
}

onBeforeMount(async () => {
  await loadUsers();
});
</script>

<style lang="scss"></style>
