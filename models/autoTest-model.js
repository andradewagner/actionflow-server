const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AutoTest = new Schema (
    {
        app: { type: String, required: true },
        feature: { type: String, required: true },
        exectionTime: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('auto', AutoTest)