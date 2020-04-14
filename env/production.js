const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/actionflow', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

const port = 3001

module.exports = {db, port}