const express= require("express");
const router= express.Router();
const {handlenewUser}= require("../controller/user");


router.route("/")
.get((req,res) => {
    res.status(300).json({hi:"successfully called"});
})
.post(handlenewUser);