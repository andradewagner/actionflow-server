const express = require('express')

const TestCtrl = require('../controllers/test-controller')

const router = express.Router()

router.post('/test', TestCtrl.createTest)
router.put('/test/:id', TestCtrl.updateTest)
router.delete('/test/:id', TestCtrl.deleteTest)
router.get('/test/:id', TestCtrl.getTestById)
router.get('/tests', TestCtrl.getTests)

module.exports = router