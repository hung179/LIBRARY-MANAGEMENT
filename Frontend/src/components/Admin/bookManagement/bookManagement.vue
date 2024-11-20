<template>
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Thêm Sách Mới</h2>
        <form @submit.prevent="submitForm">

            <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="bookName">Mã định danh sách</label>
                <input v-model="book.idBook" type="text" id="idBook"
                    class="w-full p-2 border border-gray-300 rounded-md" placeholder="Nhập mã sách" required />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="bookName">Tên Sách</label>
                <input v-model="book.bookName" type="text" id="bookName"
                    class="w-full p-2 border border-gray-300 rounded-md" placeholder="Nhập tên sách" required />
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="coverImage">Ảnh Bìa Sách (URL)</label>
                <input v-model="book.image" type="url" id="coverImage"
                    class="w-full p-2 border border-gray-300 rounded-md" placeholder="Nhập URL ảnh bìa" required />
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="authorName">Tên Tác Giả</label>
                <input v-model="book.author" type="text" id="authorName"
                    class="w-full p-2 border border-gray-300 rounded-md" placeholder="Nhập tên tác giả" required />
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="price">Giá Sách (VNĐ)</label>
                <input v-model="book.price" type="number" id="price"
                    class="w-full p-2 border border-gray-300 rounded-md" placeholder="Nhập giá sách" required />
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="quantity">Số Lượng Sách</label>
                <input v-model="book.remaining" type="number" id="remaining"
                    class="w-full p-2 border border-gray-300 rounded-md" placeholder="Nhập số lượng sách" required />
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="yearPublished">Năm Xuất Bản</label>
                <input v-model="book.publicationYear" type="number" id="yearPublished"
                    class="w-full p-2 border border-gray-300 rounded-md" placeholder="Nhập năm xuất bản" required />
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="publisherName">Tên Nhà Xuất Bản</label>
                <input v-model="book.publisher.name" type="text" id="publisherName"
                    class="w-full p-2 border border-gray-300 rounded-md" placeholder="Nhập tên nhà xuất bản" required />
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="publisherAddress">Địa Chỉ Nhà Xuất Bản</label>
                <input v-model="book.publisher.address" type="text" id="publisherAddress"
                    class="w-full p-2 border border-gray-300 rounded-md" placeholder="Nhập địa chỉ nhà xuất bản"
                    required />
            </div>

            <button type="submit"
                class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                Thêm Sách
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Book from '../../../services/book.service';
const book = ref({
    idBook: '',
    bookName: '',
    image: '',
    author: '',
    price: null,
    remaining: null,
    publicationYear: null,
    publisher: {
        name: '',
        address: ''
    }
});

const submitForm = () => {
    Book.createBook(book.value)
    console.log(book.value)

    alert('Sách đã được thêm thành công!');
    // Reset form
    book.value = {
        idBook: "",
        bookName: '',
        image: '',
        author: '',
        price: null,
        remaining: null,
        publicationYear: null,
        publisher: {
            name: '',
            address: ''
        }
    };
};
</script>
