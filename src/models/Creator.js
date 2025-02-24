const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Creator', creatorSchema); 