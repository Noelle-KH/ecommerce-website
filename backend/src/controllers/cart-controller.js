const createError = require('http-errors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const cartController = {
  getCartItems: async (req, res, next) => {
    try {
      const buyerId = req.user.id

      const cart = await prisma.cart.findFirst({
        where: { checkout: false, buyerId },
        select: {
          id: true,
          cartItem: {
            select: {
              id: true,
              amount: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  price: true,
                  stock: true
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            }
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
      const { productId, cartId } = req.body

      let cartItem

      const foundProduct = await prisma.product.findFirst({
        where: { id: productId },
        select: { stock: true }
      })

      const foundCartItem = await prisma.cartItem.findFirst({
        where: { cartId, productId },
        select: { id: true, amount: true }
      })

      if (
        foundProduct.stock < 1 ||
        (foundCartItem && foundCartItem.amount + 1 > foundProduct.stock)
      ) {
        throw createError(400, '該商品庫存不足')
      }

      if (foundCartItem) {
        cartItem = await prisma.cartItem.update({
          where: { id: foundCartItem.id },
          data: { amount: { increment: 1 } },
          select: {
            id: true,
            amount: true,
            product: {
              select: {
                id: true,
                name: true,
                image: true,
                price: true,
                stock: true
              }
            }
          }
        })
      } else {
        cartItem = await prisma.cartItem.create({
          data: { cartId, productId, amount: 1 },
          select: {
            id: true,
            amount: true,
            product: {
              select: {
                id: true,
                name: true,
                image: true,
                price: true,
                stock: true
              }
            }
          }
        })
      }

      res.json({
        status: 'success',
        message: '新增購物車商品成功',
        data: {
          cartItem
        }
      })
    } catch (error) {
      next(error)
    }
  },
  updateCartStatus: async (req, res, next) => {
    try {
      const buyerId = req.user.id

      const result = await prisma.$transaction(async (tx) => {
        const foundCart = await tx.cart.findFirst({
          where: { checkout: false, buyerId },
          select: { id: true }
        })

        if (!foundCart) {
          throw createError(400, '該購物車不存在')
        }

        const cartItems = await tx.cartItem.findMany({
          where: { cartId: foundCart.id },
          select: {
            amount: true,
            product: { select: { id: true, stock: true } }
          }
        })

        for (const cartItem of cartItems) {
          const { product, amount } = cartItem

          if (product.stock < amount) {
            throw createError(400, '該商品庫存不足')
          }

          await prisma.product.update({
            where: { id: product.id },
            data: { stock: { decrement: amount } },
            select: { stock: true }
          })
        }

        await tx.cart.update({
          where: { id: foundCart.id },
          data: { checkout: true },
          select: { checkout: true }
        })

        const newCart = await tx.cart.create({
          data: { buyerId },
          select: { id: true }
        })

        return newCart.id
      })

      if (result) {
        res.json({
          status: 'success',
          message: '購物車狀態更新成功',
          data: { cartId: result }
        })
      }
    } catch (error) {
      next(error)
    }
  },
  updateCartItem: async (req, res, next) => {
    try {
      const { cartItemId } = req.params
      const { amount } = req.body

      const cartItem = await prisma.cartItem.findFirst({
        where: { id: cartItemId },
        select: {
          id: true,
          product: { select: { id: true, stock: true } }
        }
      })

      if (!cartItem) {
        throw createError(404, '該購物車商品不存在')
      }

      if (cartItem.product.stock < Number(amount)) {
        throw createError(400, '該商品庫存不足')
      }

      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { amount: Number(amount) },
        select: { amount: true }
      })

      res.json({
        status: 'success',
        message: '購物車商品數量更新成功'
      })
    } catch (error) {
      next(error)
    }
  },
  deleteCartItem: async (req, res, next) => {
    try {
      const { cartItemId } = req.params

      const cartItem = await prisma.cartItem.findFirst({
        where: { id: cartItemId },
        select: { id: true, amount: true, productId: true }
      })

      if (!cartItem) {
        throw createError(404, '該購物車商品不存在')
      }

      await prisma.cartItem.delete({ where: { id: cartItem.id } })

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
