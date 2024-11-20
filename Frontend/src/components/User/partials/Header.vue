<template>
  <div class="w-full flex items-center">
    <div class="mr-auto ml-4">
      <!-- Button mở navbar -->
      <button @click="toggleNavbar">
        <font-awesome-icon :icon="['fas', 'bars']" class="size-10" />
      </button>

      <!-- Navbar -->
      <div
        :class="[
          'fixed top-0 left-0 h-full bg-gray-200 text-black transition-transform duration-300 z-50',
          { '-translate-x-full': !isNavbarOpen },
        ]"
        class="w-64"
      >
        <div class="p-4">
          <ul>
            <li class="mb-2">
              <a  @click="goToHome" href="#" class="text-2l font-bold hover:underline"
                >Trang chủ</a
              >
            </li>
            <li class="mb-2">
              <a @click="goToSearch" href="#" class="text-2l font-bold hover:underline">Tìm kiếm</a>
            </li>
            <li class="mb-2">
              <a @click="goToContact" class="text-2l font-bold hover:underline">Liên hệ</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Overlay mờ khi navbar mở -->
      <div
        v-if="isNavbarOpen"
        @click="toggleNavbar"
        class="fixed inset-0 bg-black opacity-50 z-40"
      ></div>
    </div>
    <!-- Ảnh logo -->
    <div class="mx-auto">
      <a @click="goToHome" href="#">
        <img src="../../../img/logo/BookLend.png" alt="" />
      </a>
    </div>
    <!-- Thanh tìm kiếm -->
    <div class="ml-auto mr-4 flex item-center">
      <div class="mr-4">
        <!-- Sẽ render ra Search view -->
         <a @click="goToSearch" href="#">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="size-5 pt-3"/>
      </a>
      </div>
      <div class="ml-4 border border-2 rounded-full border-black ">
        <!-- Chỗ này sẽ render ra icon người dùng và drop down -->
        <userIcon v-if="userInformation.user"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue"
import {useRouter} from "vue-router"
import userIcon from "./UserIcon.vue"


const isNavbarOpen = ref(false);

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value;
}

const router = useRouter();

const goToSearch = () => {
  router.push({name: 'user-search'}); 
};

const goToHome = () => {
  router.push({name: 'user-home'});
}

const goToContact = () => {
  router.push({name: 'user-contact'});
}

// const Log = {
//   username: "hungb2110079",
//   password: "12345678"
// }

const userInformation = inject('user')

</script>
