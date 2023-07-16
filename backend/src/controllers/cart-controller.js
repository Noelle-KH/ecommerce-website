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
      const { cartId } = req.user
      const { productId } = req.body

      const createCartItem = await prisma.$transaction(async (tx) => {
        const checkProductStock = await tx.product.findFirst({
          where: { id: productId, stock: { gte: 1 } }
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
            data: { amount: { increment: 1 } }
          })
        } else {
          cartItem = await tx.cartItem.create({
            data: { cartId, productId, amount: 1 },
            include: { product: true }
          })
        }

        const modifyProductStock = await tx.product.update({
          where: { id: productId },
          data: { stock: { decrement: 1 } }
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
  updateCartStatus: async (req, res, next) => {
    try {
      const buyerId = req.user.id
      const result = await prisma.$transaction(async (tx) => {
        const cartId = await tx.cart.findFirst({
          where: { checkout: false, buyerId },
          select: { id: true }
        })

        if (!cartId) {
          throw createError(400, '該購物車不存在')
        }

        const cartItems = await tx.cartItem.findMany({
          where: { cartId },
          include: { product: true }
        })

        for (const cartItem of cartItems) {
          const { product, amount } = cartItem

          if (product.stock < amount) {
            throw createError(400, '該商品庫存不足')
          }
        }

        await tx.cart.update(
          { where: { id: cartId } },
          { data: { checkout: true } }
        )
        await tx.cart.create({ buyerId })

        return true
      })

      if (result) {
        res.json({
          status: 'success',
          message: '購物車狀態更新成功'
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
      const result = await prisma.$transaction(async (tx) => {
        const cartItem = await tx.cartItem.findFirst({
          where: { id: cartItemId },
          include: { product: true }
        })

        if (!cartItem) {
          throw createError(404, '該購物車商品不存在')
        }

        if (cartItem.product.stock < Number(amount)) {
          throw createError(400, '該商品庫存不足')
        }

        await tx.cartItem.update({
          where: { id: cartItem.id },
          data: { amount: Number(amount) }
        })

        await tx.product.update({
          where: { id: cartItem.product.id },
          data: { stock: { decrement: Number(amount) - cartItem.amount } }
        })

        return true
      })

      if (result) {
        res.json({
          status: 'success',
          message: '購物車商品數量更新成功'
        })
      }
    } catch (error) {
      next(error)
    }
  },
  deleteCartItem: async (req, res, next) => {
    try {
      const { cartItemId } = req.params

      const result = await prisma.$transaction(async (tx) => {
        const cartItem = await tx.cartItem.findFirst({
          where: { id: cartItemId }
        })

        if (!cartItem) {
          throw createError(404, '該購物車商品不存在')
        }

        await prisma.product.update({
          where: { id: cartItem.productId },
          data: { stock: { increment: cartItem.amount } }
        })

        await prisma.cartItem.delete({ where: { id: cartItem.id } })

        return true
      })

      if (result) {
        res.json({
          status: 'success',
          message: '刪除購物車商品成功'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = cartController
