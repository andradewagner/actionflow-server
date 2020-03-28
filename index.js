const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const testRouter = require('./routes/test-router')
const autoRouter = require('./routes/auto-router')
const app = express()
const apiPort = 3001

app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('connected', console.log.bind(console, 'Sucesso ao conectar ao MongoDB!'))
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', testRouter)
app.use('/api', autoRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))