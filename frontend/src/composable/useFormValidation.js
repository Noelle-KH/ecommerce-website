const switchErrorName = (fieldName) => {
  switch (fieldName) {
    case 'account':
      return '帳號'
    case 'password':
      return '密碼'
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

const useFormValidation = (formData, formError, errorMessage) => {
  const validationRules = (fieldName) => {
    if (!formData[fieldName]) return `${switchErrorName(fieldName)}不得為空`
    return null
  }

  const fieldValidation = (validator, fieldName) => {
    return (formError[fieldName] = validator || null)
  }

  const clearError = () => {
    const errorKeys = Object.keys(formError)
    for (const key of errorKeys) {
      formError[key] = null
    }
    errorMessage.value = null
  }

  const validFieldForm = () => {
    const errorKeys = Object.keys(formError)
    for (const key of errorKeys) {
      if (formError[key] !== null) {
        return false
      }
      return true
    }

  }

  return { validationRules, fieldValidation, clearError, validFieldForm }
}

export default useFormValidation
