// Author: Mel Vincent Anonuevo
// Student ID: 301167069
// Date: Feb 1, 2022

// Do not use it in production
let DB_CONNECTION ="mongodb+srv://dbadmin:5WwaSJObLquB5cKz@comp229-mel.bmpbg.mongodb.net/COMP229-002"

// Database Setup
let mongoose = require('mongoose');

module.exports = function(){  

    // Connect to the DB
    mongoose.connect(DB_CONNECTION);

    let mongoDB = mongoose.connection;

    mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
    mongoDB.once('open', ()=>{
        console.log('Connected to MongoDB...');
    })

    return mongoDB;
}

