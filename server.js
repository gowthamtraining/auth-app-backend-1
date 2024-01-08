const express = require("express")
const app =new express()
const env = require("dotenv").config()
const bodyparser = require('body-parser')
const mongoose = require("mongoose")
const cors= require("cors")
const cookie_parser = require("cookie-parser")
app.use(bodyparser.json())
app.use(cors({
    credentials:true
}))
app.use(bodyparser.urlencoded({extended:true}))
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.removeHeader("x-powered-by");
//     res.setHeader("Access-Control-Allow-Methods", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     res.setHeader('Access-Control-Allow-Credentials','*')
//     res.setHeader("Access-Control-Request-Headers","*")
//     res.setHeader("Access-Control-Request-Methods","*")
//     next();
//   });

app.use(cookie_parser())
app.use(express.json())
const { router } = require("./routes/userRoutes")
app.use("/api/",router)

mongoose.connect(process.env.MONGOBD_URL)
app.listen(5000)

