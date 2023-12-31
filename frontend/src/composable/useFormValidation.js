const switchErrorName = (fieldName) => {
  switch (fieldName) {
    case 'account':
      return '帳號'
    case 'password':
      return '密碼'
    case 'confirmPassword':
      return '確認密碼'
    case 'name':
      return '商品名稱'
    case 'description':
      return '商品描述'
    case 'image':
      return '商品圖片'
    case 'categoryId':
      return '商品分類'
    case 'price':
      return '商品單價'
    case 'stock':
      return '商品庫存'
    default:
      return
  }
}

const switchErrorCode = (code) => {
  switch (code) {
    case 4001:
      return 'account'
    case 4002:
      return 'password'
    case 4003:
      return 'account password'
    case 4004:
      return 'name'
    case 4005:
      return 'description'
    case 4006:
      return 'image'
    case 4007:
      return 'price'
    case 4008:
      return 'stock'
    case 4009:
      return 'confirmPassword'
    case 4010:
      return 'password confirmPassword'
    default:
      return
  }
}

export const useFormValidation = (formData, formError, errorMessage) => {
  const validationRules = (fieldName) => {
    if (!formData.value[fieldName])
      return `${switchErrorName(fieldName)}不得為空`
    if (
      typeof formData.value[fieldName] === 'string' &&
      fieldName === 'image'
    ) {
      return '請上傳新圖片'
    }
    return null
  }

  const fieldValidation = (validator, fieldName) => {
    return (formError.value[fieldName] = validator || null)
  }

  const validFieldForm = () => {
    const errorKeys = Object.keys(formError.value)
    for (const key of errorKeys) {
      if (formError.value[key] !== null) {
        return false
      }
    }
    return true
  }

  const responseError = (error) => {
    const { code, message } = error
    const errorField = switchErrorCode(code)
    if (!errorField) {
      errorMessage.value = '伺服器錯誤，請稍後再使用'
    } else if (
      errorField === 'account password' ||
      errorField === 'password confirmPassword'
    ) {
      errorField
        .split(' ')
        .forEach((fieldName) => (formError.value[fieldName] = message))
    } else {
      formError.value[errorField] = message
    }
  }

  const resetForm = () => {
    Object.keys(formData.value).forEach((fieldName) => {
      formData.value[fieldName] = ''
      formError.value[fieldName] = null
    })
  }

  return {
    validationRules,
    fieldValidation,
    validFieldForm,
    responseError,
    resetForm
  }
}
