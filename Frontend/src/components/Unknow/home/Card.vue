<template>
  <div>
  <div
    class="flex flex-col justify-between mb-4 border border-gray-200 rounded-lg shadow-lg max-w-60"
  >
    <a @click="currentBookInformation(bookInformation, $event)" href="#">
      <div class="py-2 h-auto object-contain min-h-[18rem]">
        <!-- Hình ảnh sách -->
        <img class="mx-auto" :src="book.image" alt="" />
      </div>
      <!-- Lưu ý tên sách và tên tác giả được giữ cố định, vượt quá cố định có thể gây lệch phần tử -->
      <div class="px-4 min-h-[4rem]">
        <!-- Tên sách -->
        <h1 class="text-xl font-bold text-center">{{ book.bookName }}</h1>
      </div>

      <div class="px-4 py-2 min-h-[4rem]">
        <!-- Mô tả sách -->
        <p>Tác giả: {{ book.author }}</p>
      </div>
      <div class="px-4 py-2">
        <!-- Số lượng sách -->
        <span class="font-bold">Còn lại: {{ book.remaining }}</span>
      </div>
      <div class="mt-auto px-4">
        <!-- Giá sách -->
        <span class="font-bold">{{ book.price }}đ</span>
      </div>
      <div class="flex justify-center px-4 py-2 mb-4"></div>
    </a>
  </div>
  <component
      :is="currentInformation"
      v-if="currentInformation"
      v-model="currentInformation"
      :book="book"
    />
  </div>
</template>

<script setup>

import { shallowRef } from 'vue';
import bookInformation from './BookInfo.vue';

const currentInformation = shallowRef(null)
// defineModel();

const currentBookInformation = (value, event) => {
  event.preventDefault();
  currentInformation.value = value;
}

defineProps({
  book: Object,
});
</script>