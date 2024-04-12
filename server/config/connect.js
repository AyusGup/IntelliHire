require('dotenv').config()
const mongoose= require('mongoose')

mongoose
    .connect('mongodb+srv://garghardik2972:rIariZnoGTgGKfAR@cluster0.gbhbipy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {useNewUrlParser:true})
    .then(()=>{console.log("Db connected")})
    .catch((err)=>{console.log(err)})