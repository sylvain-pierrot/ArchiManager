<template>
  <q-layout>
    <q-header>
      <q-img
        width="20em"
        src="../assets/logo-archimanager.svg"
        alt="logo archimanager"
        class="q-ma-lg fixed-top-left"
        loading="eager"
      />
    </q-header>
    <q-page-container>
      <router-view class="bg-img bg-dark" />
    </q-page-container>
  </q-layout>
</template>

<script setup></script>
<style>
.bg-img {
  background-image: url(../assets/bg-rectangular.svg) !important;
  background-position: bottom !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}
</style>
