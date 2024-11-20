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
                  Đăng nhập
                </DialogTitle>
                <!-- Phần nội dung -->
                <div my-2>
                  <form @submit.prevent="login">
                    <!-- Các input đăng nhập -->
                    <div>
                      <!-- Username -->
                      <div class="my-5">
                        <input id="username" type="text"
                          class="h-10 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md pl-3 text-sm border-2 border-gray-300"
                          placeholder="Username" v-model="username" required />
                      </div>
                      <!-- Mật khẩu -->
                      <div class="mb-5">
                        <input id="password" type="password"
                          class="h-10 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md pl-3 text-sm border-2 border-gray-300"
                          placeholder="Password" v-model="password" required />
                      </div>
                    </div>
                    <div>
                      <button type="submit"
                        class="w-full flex justify-center py-3 text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Login
                      </button>
                    </div>
                  </form>
                  <!-- Nút đăng nhập -->
                  <!-- Quên mật khẩu -->
                  <!-- <div>
                    <p class="mt-6 text-gray-600 text-center">
                      <a href="#" class="hover:text-blue-500">
                        Quên mật khẩu?
                      </a>
                    </p>
                  </div> -->
                  <!-- Chưa có tài khoản -->
                  <div class="text-center">
                    <p class="mt-6 text-gray-600">
                      Chưa có tài khoản?
                      <a @click="changeForm(RegisterForm)" href="#" class="hover:text-blue-500">
                        Đăng ký ngay.
                      </a>
                    </p>
                  </div>
                  <!-- Đăng nhập với Google hoặc Facebook -->

                  <!-- <div class="flex items-center my-4">
                    <div class="flex-1 border-t border-gray-300"></div>
                    <span class="px-4 text-gray-500 text-sm">hoặc</span>
                    <div class="flex-1 border-t border-gray-300"></div>
                  </div> -->

                  <!-- <div class="mt-6">
                    <button type="button"
                      class="w-full flex items-center justify-center py-3 border-2 border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                      <img src="../../../img/icons/google.png" class="size-5 mr-4" alt="" />
                      Đăng nhập với Google
                    </button>
                  </div>
                  <div class="mt-6">
                    <button type="button"
                      class="w-full flex items-center justify-center py-3 border-2 border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                      <img src="../../../img/icons/facebook.png" class="size-5 mr-4" alt="" />
                      Đăng nhập với Facebook
                    </button>
                  </div> -->
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
import { ref, computed } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import RegisterForm from "./RegisterForm.vue";
import { useRouter } from "vue-router"
const router = useRouter();

const currentForm = defineModel();

const isOpen = ref(true)

function closeModal() {
  isOpen.value = false;
  currentForm.value = null;
  // currentForm.clear(); // nếu muốn xóa dữ liệu trước khi đóng modal, thì dùng hàm clear() hoặc reset()
  //   currentForm.reset(); làm mới form hiện tại
}

const changeForm = (value) => {
  currentForm.value = value;
}


import unknowService from "../../../services/unknow.service"

const username = ref("")
const password = ref("")

const login = () => {
  unknowService.getUser({
    username: username.value,
    password: password.value,
  }).then(
    (user) => {
      console.log(user)
      if(user.user.role === 'user'){
      localStorage.setItem("user", JSON.stringify(user))
      router.push("/user")}
      else {
        localStorage.setItem("admin", JSON.stringify(user))
        router.push("/admin")
      }
    }
  )
}


</script>