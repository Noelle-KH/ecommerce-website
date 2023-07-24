const createError = require('http-errors')

const authValidation = (type) => {
  return (req, res, next) => {
    const { account, password } = req.body
    if (!account) {
      return next(createError(400, '帳號不得為空', { code: 4001 }))
    }

    if (!password) {
      return next(createError(400, '密碼不得為空', { code: 4002 }))
    }

    if (type === 'register') {
      const { confirmPassword } = req.body

      if (!confirmPassword) {
        return next(createError(400, '確認密碼不得為空', { code: 4009 }))
      }

      if (confirmPassword !== password) {
        return next(createError(400, '密碼和確認密碼不相符', { code: 4010 }))
      }
    }

    next()
  }
}

const productValidation = (req, res, next) => {
  const { name, description, price, stock } = req.body

  if (!name) {
    return next(createError(400, '商品名稱不得為空', { code: 4004 }))
  }

  if (!description) {
    return next(createError(400, '商品描述不得為空', { code: 4005 }))
  }

  if (!price) {
    return next(createError(400, '商品單價不得為空', { code: 4007 }))
  }

  if (!stock) {
    return next(createError(400, '商品庫存不得為空', { code: 4008 }))
  }

  next()
}

module.exports = { authValidation, productValidation }
