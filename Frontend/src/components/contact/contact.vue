<template>
    <form class="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg" @submit.prevent="handleSubmit">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Liên hệ với chúng tôi</h2>
  
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium mb-2">Họ và tên</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập họ và tên của bạn"
          required
        />
      </div>
  
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập email của bạn"
          required
        />
      </div>
  
      <div class="mb-4">
        <label for="message" class="block text-gray-700 font-medium mb-2">Nội dung</label>
        <textarea
          id="message"
          v-model="form.message"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập nội dung"
          rows="4"
          required
        ></textarea>
      </div>
  
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Gửi
      </button>
    </form>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  
  const form = reactive({
    name: '',
    email: '',
    message: ''
  });
  
  const handleSubmit = () => {
    console.log("Thông tin gửi:", form);
    alert("Thông tin của bạn đã được gửi thành công!");
    form.name = '';
    form.email = '';
    form.message = '';
  };
  </script>
  