<template>
  <div>
    <div class="fixed inset-0 flex items-center justify-center"></div>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-2xl font-bold leading-6 text-gray-900 text-center"
                >
                  Đăng ký
                </DialogTitle>
                <!-- Phần nội dung -->
                <div class="my-2">
                  <Form
                    @submit="onSubmit"
                    :validation-schema="schema"
                    class="space-y-4"
                  >
                    <!-- Input đăng ký -->
                    <div>
                      <label for="username" class="font-medium"
                        >Nhập Username</label
                      >
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        class="h-10 mt-1 w-full rounded-md border-2 border-gray-300 pl-3 text-sm"
                      />
                      <ErrorMessage name="username" class="text-red-500" />
                    </div>

                    <div>
                      <label for="email" class="font-medium">Nhập Email</label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        class="h-10 mt-1 w-full rounded-md border-2 border-gray-300 pl-3 text-sm"
                      />
                      <ErrorMessage name="email" class="text-red-500" />
                    </div>

                    <div>
                      <label for="password" class="font-medium"
                        >Nhập Mật Khẩu</label
                      >
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Mật khẩu dài từ 8-12 ký tự"
                        class="h-10 mt-1 w-full rounded-md border-2 border-gray-300 pl-3 text-sm"
                      />
                      <ErrorMessage name="password" class="text-red-500" />
                    </div>

                    <div>
                      <label for="confirmPassword" class="font-medium"
                        >Xác Nhận Mật Khẩu</label
                      >
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        class="h-10 mt-1 w-full rounded-md border-2 border-gray-300 pl-3 text-sm"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        class="text-red-500"
                      />
                    </div>

                    <!-- Nút đăng ký -->
                    <button
                      type="submit"
                      class="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                    >
                      Đăng Ký
                    </button>
                  </Form>
                  <!-- Quay lại đăng nhập -->
                  <div class="mt-6 text-center text-gray-500">
                    Đã có tài khoản ?
                    <a
                      @click="changeForm(LoginForm)"
                      href="#"
                      class="hover:text-blue-500"
                    >
                      Đăng Nhập
                    </a>
                  </div>

                  <!-- Nút đóng -->
                  <div class="absolute top-2 right-2">
                    <button
                      @click="closeModal"
                      class="flex items-center justify-center p-3 size-10 rounded-full hover:bg-gray-200"
                    >
                      <span class="font-bold">x</span>
                    </button>
                  </div>
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
import LoginForm from "./LoginForm.vue";
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import * as yup from "yup";
import unknowService from "../../../services/unknow.service";
const schema = yup.object({
  username: yup
    .string()
    .required("Tên người dùng là bắt buộc")
    .min(6, "username phải có ít nhất 6 ký tự"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải ít nhất 8 ký tự")
    .max(12, "Mật khẩu không quá 12 ký tự")
    .required("Mật khẩu là bắt buộc"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

const isOpen = ref(true);
const currentForm = defineModel();

const closeModal = () => {
  isOpen.value = false;
  currentForm.value = null;
};

const onSubmit = (values) => {
  // values chỉ là một object bình thường có thông tin đã nhập vào

  const { confirmPassword, ...userData } = values;
  alert('Đăng ký thành công')
  unknowService.createUser(userData);
  closeModal();
};

const changeForm = (value) => {
  currentForm.value = value;
};
</script>
    