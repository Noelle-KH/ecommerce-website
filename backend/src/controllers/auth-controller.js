const bcrypt = require('bcryptjs')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const authController = {
  login: async (req, res, next) => {
    try {
      const { role } = req.query
      const { account, password } = req.body

      const query =
        role === 'buyer'
          ? {
              where: { account, role },
              include: {
                cart: {
                  where: { checkout: false },
                  select: { id: true }
                }
              }
            }
          : { where: { account, role } }

      const foundUser = await prisma.user.findFirst(query)

      if (!foundUser) {
        throw createError(404, '帳號不存在', { code: 4001 })
      }

      const isMatch = await bcrypt.compare(password, foundUser.password)
      if (!isMatch) {
        throw createError(400, '帳號或密碼錯誤', { code: 4003 })
      }

      const user =
        role === 'buyer'
          ? {
              id: foundUser.id,
              account: foundUser.account,
              role: foundUser.role,
              cartId: foundUser.cart[0].id
            }
          : {
              id: foundUser.id,
              account: foundUser.account,
              role: foundUser.role
            }

      const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
        expiresIn: '1d'
      })

      res.json({
        status: 'success',
        message: '登入成功',
        data: {
          user,
          token
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = authController
