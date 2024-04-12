const User = require("../models/User");
const dotenv = require('dotenv');
dotenv.config();

async function handlenewUser(req,res){
    const user = new User({
        username:req.body.username,
        contact:req.body.contact,
        email:req.body.email,
        password:req.body.password,
        userImage:req.body.MyFile
    })
    
    user.save()
        .then((user) => {
        const token = setUser(user)
        return res.json({
            customToken: token,
            url: "/secret"
        })
        })
        .catch((error) => {
        return res.status(200).redirect("/signup")
        })
}
module.exports = {handlenewUser};