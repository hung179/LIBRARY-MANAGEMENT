<template>
  <div class="grid grid-cols-1 gap-2">
    <div class="flex w-screen justify-center">
      <div class="flex border border-black w-96 rounded">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Nhập tên sách"
          class="w-full border-none bg-transparent px-4 py-1 outline-none"
          v-model="search"
        />
      </div>
    </div>
    <div
      class="mx-auto max-w-5xl border-l border-r border-gray-300 md:border-0"
    >
      <div class="container mx-auto px-4 my-4">
        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card
            v-for="result in searchResults"
            :key="result.idBook"
            :book="result"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import Card from "../home/Card.vue";
import bookService from "../../../services/book.service.js";

const books = ref([]);
bookService.getAllBook().then((allbook) => {
  books.value = allbook;
});

const search = ref("");

const searchResults = computed(() => {
  return books.value.filter((book) => {
    return book.bookName.toLowerCase().includes(search.value.toLowerCase());
  });
});
</script>

<style>
</style>