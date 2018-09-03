const express = require('express')
const uuidv1 = require('uuid/v1')
const mime = require('mime-types')

const FileCtrl = require('../controllers/file')
const Users = require('../controllers/user')
const { catchError } = require('../controllers/error')

const multer = require('multer')

const router = express.Router()

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files/')
  },
  filename: (req, file, cb) => {
    cb(null, uuidv1() + '.' + mime.extension(file.mimetype))
  }
})

const verifyStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './docs/')
  },
  filename: (req, file, cb) => {
    cb(null, uuidv1() + '.' + mime.extension(file.mimetype))
  }
})

const upload = multer({ storage: fileStorage })
const uploadVerify = multer({ storage: verifyStorage })

// Upload verification document: Diploma, student cardm ...
router.post('/verify', Users.checkAuth, uploadVerify.single('file'), catchError(FileCtrl.uploadVerifyDoc))

// Upload a file
router.post('/', Users.checkAuthOptional, upload.single('file'), catchError(FileCtrl.create))

// Get a file
router.get('/:id', catchError(FileCtrl.get))

// Delete a file
router.delete('/:id', Users.checkAuth, catchError(FileCtrl.remove))

// Get a verify doc
router.get('/verify/:id', catchError(FileCtrl.getVerifyDoc))

module.exports = router
