const createError = require('http-errors')

const loginValidation = (req, res, next) => {
  const { account, password } = req.body
  if (!account) {
    return next(createError(400, '帳號不得為空', { code: 4001 }))
  }

  if (!password) {
    return next(createError(400, '密碼不得為空', { code: 4002 }))
  }

  next()
}

const productValidation = (req, res, next) => {
  const { name, description, price, stock } = req.body

  if (!name) {
    return next(createError(400, '商品名稱不得為空', { code: 4003 }))
  }

  if (!description) {
    return next(createError(400, '商品描述不得為空', { code: 4004 }))
  }

  if (!price) {
    return next(createError(400, '商品單價不得為空', { code: 4006 }))
  }

  if (!stock) {
    return next(createError(400, '商品庫存不得為空', { code: 4007 }))
  }

  next()
}

module.exports = { loginValidation, productValidation }
