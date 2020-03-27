const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AutoTest = new Schema (
    {
        app: { type: String, required: true },
        features: [
            { 
                name: String, 
                exectionTime: Number, 
                screenshot: String,
                status: String,
                log: [String]
            }
        ],
    },
    { timestamps: true },
)

module.exports = mongoose.model('auto', AutoTest)