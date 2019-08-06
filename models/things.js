const mongoose = require('mongoose');

const thingsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    img: {type: String},
    webLink: {type: String},
});

const Things = mongoose.model('Things', thingsSchema);

module.exports = Things
