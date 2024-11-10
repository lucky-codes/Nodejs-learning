const mongoose =  require('mongoose')
const validator = require("validator")
const userScheme =  new mongoose.Schema({
    firstName : {
        type : String,
        required: true,
        minLength : 3,
        maxLength: 50,
        lowercase:true

    },
    lastName : {
        type : String,
        
    },
    email : {
        type :  String,
        required: true,
        lowercase:true,
        unique : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email address is not validate")
            }
        }
    },
    password : {
        type : String,
        required: true
    },
    age : {
        type : Number,
        min : 18
        
    },
    gender : {
        type : String,
        validate(value){
            if(!['male', 'female', 'others'].includes(value)){
                throw new Error("Gender Field is not valid")
            }
        }
    },
    photoUrl : {
        type : String,
        default: "https://e1.pxfuel.com/desktop-wallpaper/53/877/desktop-wallpaper-whatsapp-dp-whatsapp-dp-cute-whatsapp-dp.jpg"
    },
    about : {
        type: String
    },
    skills : {
        type : [String]
    }


}, {timestamps:true})
const user = mongoose.model('user',userScheme)
module.exports = user