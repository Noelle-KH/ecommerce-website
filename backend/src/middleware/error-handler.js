const errorHandler = (error, req, res, next) => {
  const code = error.code || 5000
  const status = error.statusCode.toString().startsWith('4') ? 'fail' : 'error'

  if (process.env.NODE_ENV === 'production') {
    res.status(error.statusCode).json({
      status,
      code,
      message: error.message
    })
  } else {
    res.status(error.statusCode).json({
      status,
      code,
      message: error.message,
      stack: error.stack
    })
  }
}

module.exports = errorHandler
