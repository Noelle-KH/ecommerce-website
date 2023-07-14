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

module.exports = { loginValidation }
