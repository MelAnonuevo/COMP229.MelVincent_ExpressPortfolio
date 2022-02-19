// Author: Mel Vincent Anonuevo
// Student ID: 301167069
// Date: Feb 1, 2022

let mongoose = require('mongoose');

// Create a model class
let businesscontactsModel = mongoose.Schema(
    {
        name: String,
        number: Number,
        email: String,
    },
    {
        collection: "contacts"
    }
);

module.exports = mongoose.model('contacts', businesscontactsModel);