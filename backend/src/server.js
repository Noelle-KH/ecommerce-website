const cors = require('cors')
const express = require('express')
const swaggerUi = require('swagger-ui-express')

const swaggerDocument = require('../swagger.json')
const routes = require('../src/routes/index')

const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      supportedSubmitMethods: []
    }
  })
)

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.all('/*', (req, res) => {
  res.status(404).json({
    message: `Cannot found ${req.originalUrl} on this server`
  })
})

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
