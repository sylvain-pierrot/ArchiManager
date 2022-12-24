<template>
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
      <q-form ref="myForm" class="q-gutter-md">
        <q-input
          outlined
          color="black"
          v-model="email"
          type="email"
          label="Email"
          :rules="[emailValidation]"
          lazy-rules
        />
      </q-form>
    </q-step>

    <q-step
      :name="2"
      title="Définissez un mot de passe"
      icon="key"
      :done="step > 2"
      :error="myForm"
    >
      <q-form ref="myForm" class="q-gutter-md">
        <q-input
          outlined
          color="black"
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          label="Mot de passe"
          :rules="[
            (val) =>
              (!!val &&
                hasLowerCase(val) &&
                hasUpperCase(val) &&
                hasNumber(val) &&
                hasHeightChars(val)) ||
              'Mot de passe invalid',
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
      </q-form>

      <q-linear-progress
        size="5px"
        :value="progress"
        :color="passwordColor"
        rounded
        instant-feedback
      />

      <q-badge
        color="transparent"
        :text-color="passwordColor"
        :label="passwordLevel"
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
                validation.function(password) ? 'check_circle' : 'highlight_off'
              "
              :color="validation.function(password) ? 'green' : ''"
            />
          </q-item-section>

          <q-item-section class="text-caption">{{
            validation.label
          }}</q-item-section>
        </q-item>
      </q-list>
    </q-step>

    <q-step :name="3" title="Informations supplémentaires" icon="info">
      <q-form ref="myForm" class="q-gutter-md">
        <q-input
          outlined
          color="black"
          v-model="nationalnumber"
          type="number"
          label="Numero national"
          :rules="[(val) => !!val || 'Numero invalide']"
          lazy-rules
        />

        <q-input
          outlined
          color="black"
          v-model="name"
          type="text"
          label="Nom"
          :rules="[(val) => !!val || 'Nom invalide']"
          lazy-rules
        />

        <q-input
          outlined
          color="black"
          v-model="firstname"
          type="text"
          label="Prenom"
          :rules="[(val) => !!val || 'Prénom invalide']"
          lazy-rules
        />

        <q-input
          outlined
          color="black"
          v-model="tel"
          type="tel"
          label="Téléphone"
          :rules="[(val) => !!val || 'Numéro de téléphone invalide']"
          lazy-rules
        />
      </q-form>
    </q-step>

    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn
          :disable="
            step === 2 ? !passwordValid() : step === 1 ? !emailValid() : false
          "
          unelevated
          @click="
            step < 3
              ? $refs.stepper.next()
              : $emit(
                  'user',
                  email,
                  password,
                  nationalnumber,
                  name,
                  firstname,
                  tel
                )
          "
          color="blue"
          :label="step === 3 ? 'Terminer' : 'Continuer'"
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
</template>
<script setup>
import { ref, computed, defineProps, toRefs } from "vue";

const props = defineProps({
  emails: {
    type: Array,
    required: true,
  },
});
const { emails } = toRefs(props);
const nationalnumber = ref(null);
const name = ref("");
const firstname = ref("");
const tel = ref(null);
const validations = [
  { label: "Une minuscule", function: hasLowerCase },
  { label: "Une majuscule", function: hasUpperCase },
  { label: "Un nombre", function: hasNumber },
  { label: "8 caractères", function: hasHeightChars },
];
const isPwd = ref(true);
const step = ref(1);
const email = ref("");
const password = ref("");
const passwordHasLowerCase = computed(() => hasLowerCase(password.value));
const passwordHasUpperCase = computed(() => hasUpperCase(password.value));
const passwordHasNumber = computed(() => hasNumber(password.value));
const passwordHasHeightChars = computed(() => hasHeightChars(password.value));
const weak = computed(
  () =>
    passwordHasLowerCase.value ||
    passwordHasUpperCase.value ||
    passwordHasNumber.value ||
    passwordHasHeightChars.value
);
const medium = computed(
  () =>
    passwordHasLowerCase.value &&
    passwordHasUpperCase.value &&
    passwordHasNumber.value &&
    passwordHasHeightChars.value
);
const strong = computed(() => medium.value && password.value.length >= 12);
const progress = computed(() => {
  let sum = 0;
  sum += weak.value ? 0.33 : 0;
  sum += medium.value ? 0.33 : 0;
  sum += strong.value ? 0.34 : 0;
  return sum;
});
const passwordLevel = computed(() => {
  if (progress.value === 0) {
    return "";
  } else if (progress.value === 0.33) {
    return "Faible";
  } else if (progress.value === 0.66) {
    return "Moyen";
  } else {
    return "Fort";
  }
});
const passwordColor = computed(() => {
  if (progress.value === 0) {
    return "";
  } else if (progress.value === 0.33) {
    return "red";
  } else if (progress.value === 0.66) {
    return "orange";
  } else {
    return "green";
  }
});

function emailValid() {
  return isValidEmail(email.value);
}
function passwordValid() {
  return (
    passwordHasLowerCase.value &&
    passwordHasUpperCase.value &&
    passwordHasNumber.value &&
    passwordHasHeightChars.value
  );
}
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
function emailValidation(val) {
  if (!isValidEmail(val)) {
    return "Email invalide";
  } else if (emails.value.includes(val)) {
    return "Cet email existe déjà";
  } else {
    return true;
  }
}
</script>

<style>
.displayBtn {
  display: none;
}
</style>
