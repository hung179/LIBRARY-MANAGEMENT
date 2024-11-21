<template>
  <div class="min-h-screen flex flex-col">
    <Header v-model="currentForm" />
    <component :is="currentForm" v-if="currentForm" v-model="currentForm" />
    <div class="flex-1">
    <router-view />
    </div>
    <FooterComponent />
  </div>
</template>

<script setup>
import { onMounted, shallowRef, ref, provide, reactive } from "vue";
import Header from "./Header.vue";
import FooterComponent from "./Footer.vue";
const currentForm = shallowRef(null);
import {useRouter} from "vue-router"
const router = useRouter();
var user= ref({})

const userInformation = ref({})
const storedUser = localStorage.getItem('user'); 
  
if (storedUser) {
    try {
      userInformation.value = JSON.parse(storedUser);
      user = userInformation.value;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      router.push('/');} 
    } else {
      router.push('/');
    }  
    provide('user', user);
    console.log(user)
</script>
