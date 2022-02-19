// Author: Mel Vincent Anonuevo
// Student ID: 301167069
// Date: Feb 1, 2022

let mongoose = require('mongoose');

// Create a model class
let inventoryModel = mongoose.Schema(
    {
        item: String,
        qty: Number,
        tags: [],
        size: {
            h: Number,
            w: Number,
            uom: String
        },
        status: String
    },
    {
        collection: "inventory"
    }
);

module.exports = mongoose.model('inventory', inventoryModel);