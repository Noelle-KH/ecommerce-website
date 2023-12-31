const createError = require('http-errors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const productController = {
  getAllProduct: async (req, res, next) => {
    try {
      const active = req.query.active !== 'false'
      const { keyword, min, max, orderBy, categoryId } = req.query

      const orderByType = {
        createdAt: { createdAt: 'desc' },
        updatedAt: { updatedAt: 'desc' },
        priceDesc: { price: 'desc' },
        priceAsc: { price: 'asc' }
      }

      let filter = {
        where: { active },
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          stock: true,
          category: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: orderByType[orderBy]
      }

      if (keyword) {
        filter = {
          ...filter,
          where: { active, name: { contains: keyword } }
        }
      } else if (min && max) {
        filter = {
          ...filter,
          where: {
            active,
            price: { lte: Number(max), gte: Number(min) }
          }
        }
      } else if (categoryId) {
        filter = {
          ...filter,
          where: {
            active,
            categoryId
          }
        }
      }

      const products = await prisma.product.findMany(filter)

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
  getProduct: async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await prisma.product.findFirst({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          stock: true,
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      })

      if (!product) {
        throw createError(404, '該商品不存在')
      }

      res.json({
        status: 'success',
        data: {
          product
        }
      })
    } catch (error) {
      next(error)
    }
  },
  postProduct: async (req, res, next) => {
    try {
      const { file } = req
      const { name, description, price, stock, categoryId } = req.body

      const data = {
        name,
        description,
        image: file.path,
        price: Number(price),
        stock: Number(stock),
        categoryId
      }

      const product = await prisma.product.create({
        data,
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          stock: true,
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      })

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
      const { name, description, price, stock, categoryId } = req.body

      const foundProduct = await prisma.product.findFirst({ where: { id } })

      if (!foundProduct) {
        throw createError(404, '該商品不存在')
      }

      const updateData = {
        name,
        description,
        image: file.path || foundProduct.image,
        price: Number(price),
        stock: Number(stock),
        categoryId
      }

      const product = await prisma.product.update({
        where: { id },
        data: { ...updateData },
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          stock: true,
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      })

      res.json({
        status: 'success',
        message: '商品更新成功',
        data: {
          product
        }
      })
    } catch (error) {
      next(error)
    }
  },
  updateProductStatus: async (req, res, next) => {
    try {
      const { id } = req.params
      const active = req.query.active !== 'false'

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

module.exports = productController
