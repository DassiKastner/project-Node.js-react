const mongoose = require("mongoose");
const stepSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    comments: String
}, {
    timestamps: true
})
module.exports = stepSchema