<template>
   <div class="flex items-center">
      <div class="relative">
        <!-- Avatar icon -->
        <img
          :src="User.avatar"
          alt="User Avatar"
          class="w-10 h-10 rounded-full cursor-pointer"
          @click="toggleDropdown"
        />

        <!-- Dropdown menu -->
        <div
          v-if="dropdownVisible"
          class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <ul class="text-gray-700">
            <li
              @click="viewHistory"
              class="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              Xem lịch sử
            </li>
            <li
              @click="logout"
              class="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              Đăng xuất
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, inject} from 'vue';
import {useRouter} from "vue-router"
const router = useRouter();

const dropdownVisible = ref(false);

const User = inject('user').user

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const viewHistory = () => {
  router.push({name: 'user-history'})
};

const logout = () => {
  localStorage.clear();
  router.push('/')
};
</script>

