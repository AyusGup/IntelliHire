const mongoose = require("mongoose")
const connect = require("../config/connect")
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    userImage:{
        type:String,
    }
})



const User = mongoose.model('user', UserSchema);

module.exports = User;