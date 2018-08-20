const express = require('express')

const { check, validationResult } = require('express-validator/check')

const PostCtrl = require('../controllers/post')

const router = express.Router()

router.post('/', PostCtrl.create)

module.exports = router
