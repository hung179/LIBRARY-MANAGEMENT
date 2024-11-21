<template>
  <div>
    <div class="fixed inset-0 flex items-center justify-center"></div>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-2xl font-bold leading-6 text-gray-900 text-center">
                  Thông tin sách
                </DialogTitle>
                <!-- Phần nội dung -->

                <!-- Khối ảnh và nội dung -->
                <div class="flex">
                  <!-- Khối ảnh & button -->
                  <div class="flex-1 p-2">
                    <img :src="book.image" alt="" />
                    <div class="flex justify-center px-4 py-2 mb-4">
                      <button @click="borrow(book)" :class="borrowed ? 'bg-green-500' : 'bg-blue-500'"
                        class="text-white p-2 rounded">
                        {{ borrowed ? "Mượn Thành Công" : "Mượn Sách" }}
                      </button>
                    </div>
                  </div>
                  <!-- Khối nội dung -->
                  <div class="flex-1 p-4">
                    <div class="grid grid-cols-1 gap-2">
                      <!-- Tên sách -->
                      <div class="min-h-[2rem]">
                        <span class="font-bold">{{ book.bookName }}</span>
                      </div>
                      <!-- Tác giả sách -->
                      <div class="">
                        <span>Tác giả: {{ book.author }} </span>
                      </div>
                      <!-- Giá sách -->
                      <div class="">
                        <span class="">Giá: {{ book.price }}</span>
                      </div>
                      <!-- Còn lại -->
                      <div class="">
                        <span class="">Còn: {{ book.remaining }}</span>
                      </div>
                      <!-- Năm xuất bản -->
                      <div>
                        <span>Năm xuất bản {{ book.publicationYear }}</span>
                      </div>
                      <!-- Nhà xuất bản -->
                      <div>
                        <!-- Tên nhà xuất bản -->
                        <div>
                          <span>Tên nhà xuất bản: {{ book.publisher.name }}</span>
                        </div>
                        <!-- Địa chỉ nhà xuất bản -->
                        <div>
                          <span>Địa chỉ: {{ book.publisher.address }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Nút đóng -->
                <div class="absolute top-2 right-2">
                  <button @click="closeModal"
                    class="flex items-center justify-center p-3 size-10 rounded-full hover:bg-gray-200">
                    <span class="font-bold">x</span>
                  </button>
                </div>
                <!-- Kết thúc phần nội dung -->
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import userService from '../../../services/user.service';

const currentInformation = defineModel();

const isOpen = ref(true);

function closeModal() {
  isOpen.value = false;
  currentInformation.value = null;
}

defineProps({
  book: Object,
});


const borrowed = ref(false);
const user = inject('user')
const borrow = (Information) => {
  userService
    .borrow({
      user_id: user.userId,
      book_id: Information.idBook,
    })
    .then(() => {
      borrowed.value = true;
    })
    .catch((error) => {
      console.error("Lỗi khi mượn sách:", error);
    });
};

</script>