<template>
  <div class="borrow-history p-4">
    <h2 class="text-2xl font-bold mb-4">Lịch Sử Mượn Sách</h2>
    <table class="min-w-full bg-white border border-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border-b text-left">Tên Sách</th>
          <th class="px-4 py-2 border-b text-left">Ngày Mượn</th>
          <th class="px-4 py-2 border-b text-left">Ngày Trả</th>
          <th class="px-4 py-2 border-b text-left">Trạng Thái</th>
          <th class="px-4 py-2 border-b text-left">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in Information" :key="index" class="hover:bg-gray-50">
          <td class="px-4 py-2 border-b">{{ book.bookName }}</td>
          <td class="px-4 py-2 border-b">{{ time(new Date(book.borrow_date)) }}</td>
          <td class="px-4 py-2 border-b">
            {{ time(new Date(book.return_date))}}
          </td>
          <td class="px-4 py-2 border-b">
            <span :class="{
              'text-green-600': book.status === 'Borrowed',
              'text-red-600': book.status === 'Returned',
            }">
              {{ book.status }}
            </span>
          </td>
          <td class="px-4 py-2 border-b">
            <button v-if="book.status === 'Borrowed'" @click="returnBook(book)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Hoàn Trả
            </button>
            <button v-if="book.status === 'Borrowed'" @click="extendLoad(book)"
              class="mt-2 mx-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Gia hạn thêm
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import User from "../../../services/user.service";

const Information = ref([]);
const user = inject('user');
// Truyền id user vào
User.getHistory(user.userId).then((history) => {
  Information.value = history;
});

// Hàm xử lý thời gian
const time = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1
    }/${date.getFullYear()}`;
};


// Hàm xử lý khi sách được hoàn trả
function returnBook(book) {
  User.returnBook({
    book_id: book.idBook,
    user_id: user.userId,
    turn: book.turn
  }).then(() => {
    // Làm mới thông tin
    User.getHistory(user.userId).then((history) => {
      Information.value = history;
    });
  })
}

function extendLoad (book) {
  console.log(book)
  User.extendLoan({
    book_id: book.idBook,
    user_id: user.userId,
    turn: book.turn
  }).then(() => {
    // Làm mới thông tin
    User.getHistory(user.userId).then((history) => {
      Information.value = history;
    });
  })
}

</script>
