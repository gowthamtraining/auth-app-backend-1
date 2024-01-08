const express = require("express")
const { siginup, siginin, verifytoken, userdata } = require("../controllers/usercontroller")

const router = express.Router()

router.post("/siginup",siginup)
router.post("/signin",siginin)
router.get("/user",verifytoken,userdata)

exports.router = router