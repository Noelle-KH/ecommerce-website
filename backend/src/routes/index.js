const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('<h1>Hi API</h1>')
})

module.exports = router
