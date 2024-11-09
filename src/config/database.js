const mongoose = require("mongoose")

const connectDB = async() => {
   await mongoose.connect("mongodb+srv://luckysingh989951:JjNRwQ2FhHRU9AfH@cluster0.ajsvc.mongodb.net/devtinder")
} 
module.exports = connectDB