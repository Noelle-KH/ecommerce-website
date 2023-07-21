<script setup>
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStoreStore } from '../../stores/store'
import { useProductStore } from '../../stores/product'
import { useAlert } from '../../composable/useAlert'
import { useApi } from '../../composable/useApi'
import { useFormValidation } from '../../composable/useFormValidation'
import FormWrapper from '../UI/FormWrapper.vue'
import InputWrapper from '../UI/InputWrapper.vue'

const productStore = useProductStore()
const storeStore = useStoreStore()
const { addNewProduct, toggleModal } = storeStore
const { categories } = storeToRefs(productStore)
const { getCategories } = productStore
const { addStoreProduct } = useApi()
const { showAlert } = useAlert()

const formData = reactive({
  name: '',
  description: '',
  image: '',
  categoryId: '',
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

onMounted(async () => {
  await getCategories()
  formData.categoryId = categories.value[0].id
})

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
        showAlert('success', message).then(() => {
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
  <FormWrapper
    styles="max-h-[90vh] overflow-y-scroll"
    :toggle="toggleModal"
    :submit="handleSubmit"
  >
    <h2 class="pb-6 text-center text-2xl font-bold text-sky-400">
      新增上架商品
    </h2>
    <InputWrapper
      name="商品名稱"
      type="text"
      :data="formData.name"
      :error="formError.name"
      placeholder="請輸入商品名稱"
      v-model="formData.name"
    />
    <InputWrapper
      name="商品描述"
      :error="formError.description"
      kind="textarea"
    >
      <textarea
        class="mb-6 mt-2 w-full rounded-sm border px-2 py-1 sm:block"
        :class="[formError.description ? 'border-red-400' : 'border-stone-400']"
        placeholder="請輸入商品描述"
        v-model="formData.description"
      ></textarea>
    </InputWrapper>

    <div class="flex gap-5">
      <InputWrapper
        name="商品圖片"
        :wrapper="true"
        :error="formError.image"
        kind="file"
      >
        <input
          type="file"
          class="mb-6 mt-2 w-full rounded-sm border px-2 py-1 sm:block"
          :class="[formError.image ? 'border-red-400' : 'border-stone-400']"
          @change="handleFileChange"
        />
      </InputWrapper>
      <InputWrapper
        name="商品分類"
        :wrapper="true"
        :error="formError.categoryId"
        kind="select"
      >
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
      </InputWrapper>
    </div>
    <div class="flex gap-5">
      <InputWrapper
        name="商品單價"
        :data="formData.price"
        :error="formError.price"
        :wrapper="true"
        type="number"
        v-model="formData.price"
      />
      <InputWrapper
        name="商品庫存"
        :data="formData.stock"
        :error="formError.stock"
        :wrapper="true"
        type="number"
        v-model="formData.stock"
      />
    </div>
    <p v-if="errorMessage" class="mb-4 text-center text-xs text-red-500">
      {{ errorMessage }}
    </p>
    <button class="w-full rounded-sm border bg-sky-300 py-1 hover:bg-sky-200">
      新增商品
    </button>
  </FormWrapper>
</template>
