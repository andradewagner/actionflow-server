const express = require('express')

const AutoCtrl = require('../controllers/auto-controller')

const router = express.Router()

router.post('/auto', AutoCtrl.create)
router.get('/autos', AutoCtrl.list)
router.get('/auto/:id', AutoCtrl.getAutoById)
router.post('/upload', AutoCtrl.uploadFile)

module.exports = router