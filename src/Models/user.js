const mongoose = require("mongoose");
const newScheme = new mongoose.Schema({
    firstName : {
        type: String,
        required:true, 
        minLength : 4,
        maxLenght : 50,

    },
    lastName : {
        type: String
    },
    email : {
        type: String,
        required:true,
        unique:true,
        trim:true,
        lowercase: true,
    },
    password : {
        type : String,
        required:true
    },
    age : {
        type : Number,
        min : 18,
    }, 
    gender:{
        type: String,
        
    },
    photoUrl: {
        type : String
    },
    about:{
        type: String,
        default:"This is the new user on this app"
    },
    Skills : {
        type : [String]
    }
})
const user = mongoose.model('user', newScheme)
module.exports =user