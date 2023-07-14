const errorHandler = (error, req, res, next) => {
  const code = error.code || 5000
  const statusCode = error.statusCode || 500
  const status = statusCode.toString().startsWith('4') ? 'fail' : 'error'

  if (process.env.NODE_ENV === 'production') {
    res.status(statusCode).json({
      status,
      code,
      message: error.message
    })
  } else {
    res.status(statusCode).json({
      status,
      code,
      message: error.message,
      stack: error.stack
    })
  }
}

module.exports = errorHandler
