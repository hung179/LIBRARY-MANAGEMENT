<template>
  <div>
    <Header v-model="currentForm" />
    <component :is="currentForm" v-if="currentForm" v-model="currentForm" />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script setup>
import { shallowRef } from "vue";
import Header from "./Header.vue";
import FooterComponent from "./Footer.vue";
const currentForm = shallowRef(null);
</script>
