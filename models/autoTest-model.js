const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AutoTest = new Schema (
    {
        app: { type: String, required: true },
        features: [
            { 
                name: String, 
                executionTime: Number, 
                screenshot: String,
                status: String,
                log: [String]
            }
        ],
        status: { type: Boolean, require: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('auto', AutoTest)