console.log('     _____          __  .__              ___________.__                 \n',
'   /  _  \\   _____/  |_|__| ____   ____ \\_   _____/|  |   ______  _  __\n',
'  /  /_\\  \\_/ ___\\   __\\  |/  _ \\ /    \\ |    __)  |  |  /  _ \\ \\/ \\/ /\n',
' /    |    \\  \\___|  | |  (  <_> )   |  \\|     \\   |  |_(  <_> )     / \n',
' \\____|__  /\\___  >__| |__|\\____/|___|  /\\___  /   |____/\\____/ \\/\\_/  \n',
'         \\/     \\/                    \\/     \\/                        \n')

const app = require('express')();
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
const testRouter = require('./routes/test-router')
const autoRouter = require('./routes/auto-router')
const socketIo = require('socket.io')
const server = require('http').createServer(app)
const io = socketIo(server)

const env = process.env.NODE_ENV === 'production' ? require('./env/production') : require('./env/development')

app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

env.db.on('connected', console.log.bind(console, 'Sucesso ao conectar ao MongoDB!'))
env.db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(function(req, res, next) {
    res.io = io;
    next();
})
app.use('/api', testRouter)
app.use('/api', autoRouter)

server.listen(env.port, () => console.log(`Server running on port ${env.port}`))