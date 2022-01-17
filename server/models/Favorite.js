const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");
// const { Schema } = require('mongoose');

const favoriteSchema = mongoose.Schema({
    userFrom:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    movieId:{
        type: String
    },
    movieTitle:{
    type: String
    },
    movieImage:{
    type: String
    },
    movieRunTime:{
    type: String
    },

   
})




const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite } 