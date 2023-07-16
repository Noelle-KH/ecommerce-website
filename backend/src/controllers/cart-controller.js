const createError = require('http-errors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const cartController = {
  getCartItems: async (req, res, next) => {
    try {
      const buyerId = req.user.id
      const cart = await prisma.cart.findFirst({
        where: { checkout: false, buyerId },
        include: {
          cartItem: {
            include: { product: true }
          }
        }
      })

      res.json({
        status: 'success',
        data: {
          cart
        }
      })
    } catch (error) {
      next(error)
    }
  },
  postCartItem: async (req, res, next) => {
    try {
      const { productId } = req.params
      const { cartId, amount } = req.body

      const createCartItem = await prisma.$transaction(async (tx) => {
        const checkProductStock = await tx.product.findFirst({
          where: { id: productId, stock: { gte: Number(amount) } }
        })

        if (!checkProductStock) {
          throw createError(400, '該商品庫存不足')
        }

        let cartItem
        const findCartItem = await tx.cartItem.findFirst({
          where: { productId }
        })
        if (findCartItem) {
          cartItem = await tx.cartItem.update({
            where: { id: findCartItem.id },
            include: { product: true },
            data: { amount: Number(amount) }
          })
        } else {
          cartItem = await tx.cartItem.create({
            data: { cartId, productId, amount: { increment: Number(amount) } },
            include: { product: true }
          })
        }

        const modifyProductStock = await tx.product.update({
          where: { id: productId },
          data: { stock: { decrement: Number(amount) } }
        })

        if (modifyProductStock.stock < 0) {
          throw createError(400, '該商品庫存不足')
        }

        const { id, amount: itemAmount } = cartItem
        const {
          id: modifyProductId,
          name,
          description,
          image,
          price,
          stock
        } = modifyProductStock

        return {
          id,
          amount: itemAmount,
          product: {
            id: modifyProductId,
            name,
            description,
            image,
            price,
            stock
          }
        }
      })

      res.json({
        status: 'success',
        message: '新增購物車商品成功',
        data: {
          cartItem: createCartItem
        }
      })
    } catch (error) {
      next(error)
    }
  },
  updateCartStatus: async (req, res, next) => {},
  updateCartItem: async (req, res, next) => {},
  deleteCartItem: async (req, res, next) => {
    try {
      const { id } = req.params
      const cartItem = await prisma.cartItem.findFirst({ where: { id } })

      if (!cartItem) {
        throw createError(404, '該購物車商品不存在')
      }

      await Promise.all([
        prisma.product.update(
          { where: { id: cartItem.productId } },
          { stock: { increment: cartItem.amount } }
        ),
        prisma.cartItem.delete({ where: { id } })
      ])

      res.json({
        status: 'success',
        message: '刪除購物車商品成功'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = cartController
