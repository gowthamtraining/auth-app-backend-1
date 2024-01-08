const mongoose = require("mongoose")
const schema = mongoose.Schema

const userschema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email should be unique"]
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }

},{
    timestamp:true
})

module.exports = mongoose.model("users",userschema)