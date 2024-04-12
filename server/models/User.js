const mongoose = require("mongoose")
const connect = require("../config/connect")
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userImage:{
        type:String,
    },
    start:{
        type:String,
    },
    destination:{
        type:String,
    },
    startTime:{
        type:String,
    }

})



const User = mongoose.model('user', UserSchema);

module.exports = User;