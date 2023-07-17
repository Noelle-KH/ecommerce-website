const createError = require('http-errors')
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      throw createError(401, '請先註冊或登入才能使用功能')
    }

    const token = authorization.split(' ')[1]

    jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {
      if (error) {
        throw createError(401, '請先註冊或登入才能使用功能')
      }

      req.user = payload.user

      next()
    })
  } catch (error) {
    next(error)
  }
}

const verifyRole = (role) => {
  return (req, res, next) => {
    const { user } = req

    if (user.role !== role) {
      return next(createError(403, '沒有使用該頁面的權限'))
    }

    next()
  }
}

module.exports = { verifyToken, verifyRole }
