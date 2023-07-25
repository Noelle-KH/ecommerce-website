<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../stores/auth'
import { useCartStore } from '../../stores/cart'
import { useAlert } from '../../composable/useAlert'
import { useFormValidation } from '../../composable/useFormValidation'
import FormWrapper from '../UI/FormWrapper.vue'
import InputWrapper from '../UI/InputWrapper.vue'

const authStore = useAuthStore()
const cartStore = useCartStore()
const {
  changeAuthenticateStatus,
  toggleModal,
  changeTitle,
  changeModalType,
  registerOrLogin
} = authStore
const { formData, formError, errorMessage, loginType, modalType, isLoading } =
  storeToRefs(authStore)
const { getCartItems } = cartStore
const { showAlert } = useAlert()

const {
  validationRules,
  fieldValidation,
  validFieldForm,
  responseError,
  resetForm
} = useFormValidation(formData, formError, errorMessage)

const handleSubmit = async () => {
  fieldValidation(validationRules('account'), 'account')
  fieldValidation(validationRules('password'), 'password')
  if (modalType.value === '註冊') {
    fieldValidation(validationRules('confirmPassword'), 'confirmPassword')
  }

  const validForm = validFieldForm()
  if (validForm) {
    try {
      const { user, token, message } = await registerOrLogin()

      if (user && token) {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)

        showAlert('success', message).then(async () => {
          if (user.role === 'buyer') {
            await getCartItems()
          }
          changeAuthenticateStatus(true)
          toggleModal()
          resetForm()
        })
      } else {
        showAlert('success', message).then(() => {
          modalType.value = '登入'
          resetForm()
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
      @click="changeModalType"
    >
      {{ modalType === '註冊' ? '登入' : '註冊' }}
    </p>
    <h2
      class="pb-6 text-center text-2xl"
      :class="[loginType === '會員' ? 'text-orange-400' : 'text-sky-400']"
    >
      {{ loginType }}{{ modalType }}
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
    <InputWrapper
      v-if="modalType === '註冊'"
      name="確認密碼"
      type="password"
      :auth="true"
      :data="formData.confirmPassword"
      :error="formError.confirmPassword"
      placeholder="請輸入確認密碼"
      v-model="formData.confirmPassword"
    />

    <p v-if="errorMessage" class="mb-4 text-center text-xs text-red-500">
      {{ errorMessage }}
    </p>

    <button
      class="w-full rounded-sm border py-1"
      :class="[
        loginType === '會員'
          ? 'bg-orange-400 hover:bg-orange-300 disabled:bg-orange-300'
          : 'bg-sky-400 hover:bg-sky-300 disabled:bg-sky-300'
      ]"
      :disabled="isLoading"
    >
      {{ modalType }}
    </button>
    <p class="mt-2 text-center">
      <span
        v-if="modalType === '登入'"
        class="cursor-pointer tracking-widest text-sky-400 underline hover:text-sky-500"
        :class="[
          loginType === '會員'
            ? 'text-sky-400 hover:text-sky-500'
            : 'text-orange-400 hover:text-orange-500'
        ]"
        @click="changeTitle"
      >
        {{ loginType === '會員' ? '商家' : '會員' }}登入
      </span>
    </p>
  </FormWrapper>
</template>
