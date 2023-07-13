const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main () {
  await prisma.user.createMany({
    data: [
      { account: 'buyer001', password: bcrypt.hashSync('titaner', 10) },
      {
        account: 'seller001',
        password: bcrypt.hashSync('titaner', 10),
        role: 'seller'
      }
    ]
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
