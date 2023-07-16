const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const productSeed = require('./seeds/product-seed.json')

async function main () {
  await prisma.$transaction(async (tx) => {
    await prisma.user.create({
      data: {
        account: 'seller001',
        password: bcrypt.hashSync('titaner', 10),
        role: 'seller'
      }
    })

    await tx.category.createMany({
      data: [{ name: '狗狗商品' }, { name: '貓貓商品' }]
    })

    const categories = await tx.category.findMany()

    await tx.product.createMany({
      data: productSeed.map((product) => ({
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        stock: product.stock,
        categoryId: categories.find(
          (category) => category.name === product.category
        ).id
      }))
    })

    const buyer = await tx.user.create({
      data: {
        account: 'buyer001',
        password: bcrypt.hashSync('titaner', 10),
        role: 'buyer'
      }
    })
    await tx.cart.create({ data: { buyerId: buyer.id } })
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.log(error)
    await prisma.$disconnect()
    process.exit(1)
  })
