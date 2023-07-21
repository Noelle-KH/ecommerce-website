<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useCartStore } from '../../stores/cart'
import { useAlert } from '../../composable/useAlert'
import { useApi } from '../../composable/useApi'
import { useFormValidation } from '../../composable/useFormValidation'
import FormWrapper from '../UI/FormWrapper.vue'
import InputWrapper from '../UI/InputWrapper.vue'

const authStore = useAuthStore()
const cartStore = useCartStore()
const { changeAuthenticateStatus, toggleModal } = authStore
const { getCartItems } = cartStore
const { showAlert } = useAlert()
const { login } = useApi()

const loginType = ref('會員')
const formData = reactive({
  account: '',
  password: ''
})
const formError = reactive({
  account: null,
  password: null
})
const errorMessage = ref(null)

const { validationRules, fieldValidation, validFieldForm, responseError } =
  useFormValidation(formData, formError, errorMessage)

const handleChangeTitle = () => {
  formData.account = ''
  formData.password = ''
  formError.account = null
  formError.password = null
  errorMessage.value = null

  loginType.value === '會員'
    ? (loginType.value = '商家')
    : (loginType.value = '會員')
}

const handleSubmit = async () => {
  fieldValidation(validationRules('account'), 'account')
  fieldValidation(validationRules('password'), 'password')

  const validForm = validFieldForm()
  if (validForm) {
    try {
      const role = loginType.value === '會員' ? 'buyer' : 'seller'
      const { user, token, message } = await login(
        role,
        formData.account,
        formData.password
      )

      if (user && token) {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)

        showAlert('success', message).then(async () => {
          if (user.role === 'buyer') {
            await getCartItems()
          }
          changeAuthenticateStatus(true)
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
  <FormWrapper :toggle="toggleModal" :submit="handleSubmit">
    <p
      class="absolute left-[10%] top-[-8%] cursor-pointer rounded-t bg-green-400 px-3 py-2 text-lg hover:font-bold"
    >
      註冊
    </p>
    <h2
      class="pb-6 text-center text-2xl"
      :class="[loginType === '會員' ? 'text-orange-400' : 'text-sky-400']"
    >
      {{ loginType }}登入
    </h2>

    <InputWrapper
      name="帳號"
      type="text"
      :auth="true"
      :data="formData.account"
      :error="formError.account"
      placeholder="請輸入帳號"
      v-model="formData.account"
    />
    <InputWrapper
      name="密碼"
      type="password"
      :auth="true"
      :data="formData.password"
      :error="formError.password"
      placeholder="請輸入密碼"
      v-model="formData.password"
    />

    <p v-if="errorMessage" class="mb-4 text-center text-xs text-red-500">
      {{ errorMessage }}
    </p>

    <button
      class="w-full rounded-sm border py-1"
      :class="[
        loginType === '會員'
          ? 'bg-orange-400 hover:bg-orange-300'
          : 'bg-sky-400 hover:bg-sky-300'
      ]"
    >
      登入
    </button>
    <p class="mt-2 text-center">
      <span
        class="cursor-pointer tracking-widest text-sky-400 underline hover:text-sky-500"
        :class="[
          loginType === '會員'
            ? 'text-sky-400 hover:text-sky-500'
            : 'text-orange-400 hover:text-orange-500'
        ]"
        @click="handleChangeTitle"
      >
        {{ loginType === '會員' ? '商家' : '會員' }}登入
      </span>
    </p>
  </FormWrapper>
</template>
