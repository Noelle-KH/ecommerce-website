<script setup>
import Swal from 'sweetalert2'
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStoreStore } from '../../stores/store'
import { useProductStore } from '../../stores/product'
import useApi from '../../composable/useApi'
import useFormValidation from '../../composable/useFormValidation'

const productStore = useProductStore()
const storeStore = useStoreStore()
const { addNewProduct, toggleModal } = storeStore
const { categories } = storeToRefs(productStore)
const { addStoreProduct } = useApi()

const formData = reactive({
  name: '',
  description: '',
  image: '',
  categoryId: categories.value[0].id,
  price: '',
  stock: ''
})
const formError = reactive({
  name: null,
  description: null,
  image: null,
  categoryId: null,
  price: null,
  stock: null
})
const errorMessage = ref(null)
const { validationRules, fieldValidation, validFieldForm, responseError } =
  useFormValidation(formData, formError, errorMessage)

const handleFileChange = (event) => {
  formData.image = event.target.files[0]
}

const handleSubmit = async () => {
  Object.keys(formData).forEach((fieldName) =>
    fieldValidation(validationRules(fieldName), fieldName)
  )

  const validForm = validFieldForm()
  if (validForm) {
    try {
      const { product, message } = await addStoreProduct(formData)
      if (product) {
        Swal.fire({
          icon: 'success',
          title: message
        }).then(() => {
          addNewProduct(product)
          toggleModal()
        })
      }
    } catch (error) {
      responseError(error)
    }
  }
}
</script>

<template>
  <div
    class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-80"
    @click.self="toggleModal()"
  >
    <form
      class="relative max-h-[90vh] overflow-y-scroll rounded-md bg-white p-12"
      @submit.prevent="handleSubmit"
    >
      <h2 class="pb-6 text-center text-2xl font-bold text-sky-400">
        新增上架商品
      </h2>

      <div>
        <label for="name" class="before:text-red-500 before:content-['*']">
          商品名稱：
          <span v-if="formError.name" class="text-xs text-red-500">
            {{ formError.name }}
          </span>
        </label>
        <input
          type="text"
          class="mb-6 mt-2 w-full rounded-sm border px-2 py-1 sm:block"
          :class="[formError.name ? 'border-red-400' : 'border-stone-400']"
          placeholder="請輸入商品名稱"
          v-model="formData.name"
        />
      </div>
      <div>
        <label
          for="description"
          class="before:text-red-500 before:content-['*']"
        >
          商品描述：
          <span v-if="formError.description" class="text-xs text-red-500">
            {{ formError.description }}
          </span>
        </label>
        <textarea
          class="mb-6 mt-2 w-full rounded-sm border px-2 py-1 sm:block"
          :class="[
            formError.description ? 'border-red-400' : 'border-stone-400'
          ]"
          placeholder="請輸入商品描述"
          v-model="formData.description"
        ></textarea>
      </div>
      <div class="flex gap-5">
        <div class="flex-1">
          <label for="image" class="before:text-red-500 before:content-['*']">
            商品圖片：
            <span v-if="formError.image" class="text-xs text-red-500">
              {{ formError.image }}
            </span>
          </label>
          <input
            type="file"
            class="mb-6 mt-2 w-full rounded-sm border px-2 py-1 sm:block"
            :class="[formError.image ? 'border-red-400' : 'border-stone-400']"
            @change="handleFileChange"
          />
        </div>
        <div class="flex-1">
          <label for="category"
            >商品分類：
            <span v-if="formError.categoryId" class="text-xs text-red-500">
              {{ formError.categoryId }}
            </span>
          </label>
          <select
            name="category"
            class="mb-6 mt-2 w-full rounded-sm border px-2 py-2 sm:block"
            :class="[
              formError.categoryId ? 'border-red-400' : 'border-stone-400'
            ]"
            v-model="formData.categoryId"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex gap-5">
        <div class="flex-1">
          <label for="name" class="before:text-red-500 before:content-['*']">
            商品單價：
            <span v-if="formError.price" class="text-xs text-red-500">
              {{ formError.price }}
            </span>
          </label>
          <input
            type="number"
            class="mb-6 mt-2 w-full rounded-sm border px-2 py-1 sm:block"
            :class="[formError.price ? 'border-red-400' : 'border-stone-400']"
            placeholder="請輸入商品單價"
            v-model="formData.price"
          />
        </div>
        <div class="flex-1">
          <label for="name" class="before:text-red-500 before:content-['*']">
            商品庫存：
            <span v-if="formError.stock" class="text-xs text-red-500">
              {{ formError.stock }}
            </span>
          </label>
          <input
            type="number"
            class="mt-2 w-full rounded-sm border px-2 py-1 sm:block"
            :class="[
              formError.stock ? 'border-red-400' : 'border-stone-400',
              errorMessage ? 'mb-4' : 'mb-12'
            ]"
            placeholder="請輸入商品庫存"
            v-model="formData.stock"
          />
        </div>
      </div>
      <p v-if="errorMessage" class="mb-4 text-center text-xs text-red-500">
        {{ errorMessage }}
      </p>
      <button class="w-full rounded-sm border bg-sky-300 py-1 hover:bg-sky-200">
        新增商品
      </button>
    </form>
  </div>
</template>
