const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const produceSeed = require('./seeds/product-seed.json')

async function main () {
  await prisma.user.create({
    data: {
      account: 'seller001',
      password: bcrypt.hashSync('titaner', 10),
      role: 'seller'
    }
  })

  await prisma.product.createMany({
    data: produceSeed
  })

  await prisma.$transaction(async (tx) => {
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
