<template>
  <div>
    <div
      class="mx-auto max-w-5xl border-l border-r border-gray-300 md:border-0"
    >
      <div class="container mx-auto px-4 my-4">
        <span class="font-bold text-4xl">Sách Mới</span>
        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <!-- Card bắt đầu từ đây -->
          <Card v-for="book in books" :key="book.idBook" :book="book" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import bookService from "../../../services/book.service.js";
import Card from "./Card.vue";
const books = ref([]);
bookService.getAllBook().then((allbook) => {
  books.value = allbook;
});

</script>
