const createError = require('http-errors')
const multer = require('multer')
const { v2: cloudinary } = require('cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'productImage'
  }
})

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split('/')
  if (!(fileType[0] === 'image' && fileType[1] !== 'svg+xml')) {
    return cb(
      createError(400, 'Invalid image(accept .jpg, .jpeg or .png)', {
        code: 5003
      })
    )
  }

  cb(null, true)
}

const fileSize = 20 * 1024 * 1024

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize }
})

module.exports = upload
