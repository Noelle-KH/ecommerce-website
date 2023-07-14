const createError = require('http-errors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const authController = {
  getAllProduct: async (req, res, next) => {
    try {
      const active = req.query.active !== 'false'
      const products = await prisma.product.findMany({
        where: { active },
        orderBy: { createdAt: 'desc' }
      })

      res.json({
        status: 'success',
        data: {
          products
        }
      })
    } catch (error) {
      next(error)
    }
  },
  postProduct: async (req, res, next) => {
    try {
      const { file } = req
      const { name, description, price, stock } = req.body

      const data = {
        name,
        description,
        image: file.path,
        price: Number(price),
        stock: Number(stock)
      }
      const product = await prisma.product.create({ data })

      res.json({
        status: 'success',
        message: '創建新商品成功',
        data: {
          product
        }
      })
    } catch (error) {
      next(error)
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const { id } = req.params
      const { file } = req
      const { name, description, price, stock } = req.body

      const foundProduct = await prisma.product.findFirst({ where: { id } })
      if (!foundProduct) {
        throw createError(404, '該商品不存在')
      }
      const updateData = {
        name,
        description,
        image: file.path || foundProduct.image,
        price: Number(price),
        stock: Number(stock)
      }

      await prisma.product.update({ where: { id }, data: { ...updateData } })

      res.json({
        status: 'success',
        message: '商品更新成功'
      })
    } catch (error) {
      next(error)
    }
  },
  updateProductStatus: async (req, res, next) => {
    try {
      const { id } = req.params
      const { active } = req.body

      await prisma.product.update({ where: { id }, data: { active } })

      res.json({
        status: 'success',
        message: '商品狀態更新成功'
      })
    } catch (error) {
      next(error)
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params

      const foundProduct = await prisma.product.findFirst({ where: { id } })
      if (foundProduct.active) {
        throw createError(400, '請先將商品下架再進行刪除動作')
      }

      await prisma.product.delete({ where: { id } })

      res.json({
        status: 'success',
        message: '商品刪除成功'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = authController