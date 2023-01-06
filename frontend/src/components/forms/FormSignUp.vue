<template>
  <q-form @submit="$emit('user', user)" class="q-gutter-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      animated
      done-color="green"
      active-color="warning"
      inactive-color="warning"
    >
      <q-step
        :name="1"
        title="Créez votre identifiant"
        icon="email"
        :done="step > 1"
      >
        <q-input
          outlined
          color="black"
          v-model="user.email"
          type="email"
          label="Email"
          class="col-12"
          :rules="[
            (val) => (!!val && isValidEmail(val)) || 'Email invalide',
            (val) => (!!val && val.length < 255) || 'Trop de charactères',
          ]"
          lazy-rules
        />
      </q-step>

      <q-step
        :name="2"
        title="Définissez un mot de passe"
        icon="key"
        :done="step > 2"
      >
        <q-input
          outlined
          color="black"
          v-model="user.mot_de_passe"
          :type="isPwd ? 'password' : 'text'"
          label="Mot de passe"
          :rules="[
            (val) => (!!val && mediumValidation(val)) || 'Mot de passe invalid',
            (val) => (!!val && val.length < 255) || 'Trop de charactères',
          ]"
          lazy-rules
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-linear-progress
          size="5px"
          :value="progress"
          :color="password.color"
          rounded
          instant-feedback
        />

        <q-badge
          color="transparent"
          :text-color="password.color"
          :label="password.level"
        />

        <div class="text-subtitle2 q-mt-md text-grey-14">
          Le mot de passe doit au moins contenir:
        </div>
        <q-list class="row text-grey-14">
          <q-item
            v-for="(validation, index) in validations"
            :key="index"
            class="col-6"
          >
            <q-item-section avatar class="items-center">
              <q-icon
                :name="
                  validation.function(user.mot_de_passe)
                    ? 'check_circle'
                    : 'highlight_off'
                "
                :color="validation.function(user.mot_de_passe) ? 'green' : ''"
              />
            </q-item-section>

            <q-item-section class="text-caption">{{
              validation.label
            }}</q-item-section>
          </q-item>
        </q-list>
      </q-step>

      <q-step :name="3" title="Informations supplémentaires" icon="info">
        <q-input
          outlined
          color="black"
          v-model="user.numero_national"
          type="number"
          label="Numero national"
          :rules="[
            (val) => !!val || 'Numéro invalide',
            (val) => (!!val && val < 99999) || 'Trop de charactères',
          ]"
          lazy-rules
        />

        <q-input
          outlined
          color="black"
          v-model="user.nom"
          type="text"
          label="Nom"
          mask="A"
          reverse-fill-mask
          :rules="[
            (val) => !!val || 'Nom invalide',
            (val) => (!!val && val.length < 255) || 'Trop de charactères',
          ]"
          lazy-rules
        />

        <q-input
          outlined
          color="black"
          v-model="user.prenom"
          type="text"
          label="Prenom"
          mask="A"
          reverse-fill-mask
          :rules="[
            (val) => !!val || 'Prénom invalide',
            (val) => (!!val && val.length < 255) || 'Trop de charactères',
          ]"
          lazy-rules
        />

        <q-input
          outlined
          color="black"
          v-model="user.telephone"
          type="tel"
          label="Téléphone"
          mask="##-##-##-##-##"
          :rules="[
            (val) =>
              (!!val && isValidPhoneNumber(val) && val.length < 255) ||
              'Trop de charactères',
          ]"
          lazy-rules
        />
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            v-if="step < 3"
            :disable="
              step === 2
                ? !mediumValidation(user.mot_de_passe)
                : step === 1
                ? !isValidEmail(user.email)
                : false
            "
            unelevated
            @click="
              async () => {
                if (step === 1) {
                  await checkUniqueEmail(user.email, $refs);
                } else {
                  $refs.stepper.next();
                }
              }
            "
            color="blue"
            label="Continuer"
          />
          <q-btn
            v-show="step > 2"
            :disable="step < 3"
            unelevated
            type="submit"
            color="blue"
            label="Terminer"
          />
          <q-btn
            v-if="step > 1"
            unelevated
            flat
            color="blue"
            @click="$refs.stepper.previous()"
            label="Retour"
            class="q-ml-sm"
          />
          <q-btn
            :class="{ displayBtn: step != 1 }"
            flat
            unelevated
            :to="{ name: 'SignIn' }"
            color="green"
            label="S'identifier"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-form>
</template>
<script setup>
import { useUserStore } from "src/stores/user";
import { ref, computed } from "vue";

const usersStore = useUserStore();
const isPwd = ref(true);
const step = ref(1);
const user = ref({
  numero_national: null,
  nom: "",
  prenom: "",
  email: "",
  mot_de_passe: "",
  telephone: "",
});

const progress = computed(() => {
  let sum = 0;
  sum += weakValidation(user.value.mot_de_passe) ? 0.33 : 0;
  sum += mediumValidation(user.value.mot_de_passe) ? 0.33 : 0;
  sum += strongValidation(user.value.mot_de_passe) ? 0.34 : 0;
  return sum;
});
const password = computed(() => {
  let level = "";
  let color = "";

  if (progress.value === 0.33) {
    level = "Faible";
    color = "red";
  } else if (progress.value === 0.66) {
    level = "Moyen";
    color = "orange";
  } else if (progress.value === 1) {
    level = "Fort";
    color = "green";
  }

  return {
    level: level,
    color: color,
  };
});

// validations
const checkUniqueEmail = async (email, $refs) => {
  const checkEmail = await usersStore.isUniqueEmail({ email: email });
  if (checkEmail != undefined) {
    $refs.stepper.next();
  }
};

const validations = [
  { label: "Une minuscule", function: hasLowerCase },
  { label: "Une majuscule", function: hasUpperCase },
  { label: "Un nombre", function: hasNumber },
  { label: "8 caractères", function: hasHeightChars },
];
function weakValidation(val) {
  return (
    hasLowerCase(val) ||
    hasUpperCase(val) ||
    hasNumber(val) ||
    hasHeightChars(val)
  );
}
function mediumValidation(val) {
  return (
    hasLowerCase(val) &&
    hasUpperCase(val) &&
    hasNumber(val) &&
    hasHeightChars(val)
  );
}
function strongValidation(val) {
  return mediumValidation(val) && val.length >= 12;
}

// regex
function hasLowerCase(str) {
  return /[a-z]/.test(str);
}
function hasUpperCase(str) {
  return /[A-Z]/.test(str);
}
function hasNumber(str) {
  return /[0-9]/.test(str);
}
function hasHeightChars(str) {
  return str.length >= 8;
}
function isValidEmail(val) {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val);
}
function isValidPhoneNumber(phoneNumber) {
  const regex = /^\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/;
  return regex.test(phoneNumber);
}
</script>

<style scoped>
.displayBtn {
  display: none;
}
.q-field__native {
  color: black !important;
}
</style>
