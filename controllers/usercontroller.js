const usermodel = require("../models/usermodel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const siginup = async(req,res)=>{
    try {
        const {name,password,email}=req.body
        if(!req.body){
           return res.status(404).send({msg:"data is empty"})
        }
        const existinguser = await usermodel.findOne({email:email})
        if(existinguser){
            return res.status(404).json({msg:"User Is Already Exists"})
        }
        const hashedpassword = bcrypt.hashSync(password,10)
        const data = await usermodel.create({name:name,email:email,password:hashedpassword,})
        return res.status(200).json({msg:"done",user:data})
    } catch (error) {
        res.status(400).json({msg:error})
    }
}
const siginin = async(req,res)=>{
    const {email,password} = req.body
    try {
        const existinguser = await usermodel.findOne({email:email})
        if(!existinguser){
            return res.status(404).json("User Not Found")
        }
        const passwordvalidate = bcrypt.compareSync(password,existinguser.password)
        if(!passwordvalidate){
            return res.status(404).json({msg:"wrongs creditials"})
        }
        const token = jwt.sign({id:existinguser._id},process.env.SECURITY_KEY,{
            expiresIn:"1hr"
        })
        
        res.cookie(String(existinguser._id),token,{
            path:"/",
            expiresIn:new Date(Date.now()*1000*60),
            samesite:"lax"
        })
        return res.status(200).json({msg:"Login SuccessFully",user:existinguser,token:token})
    } catch (error) {
        return res.status(400).json(error)
    }
}
const verifytoken =(req,res,next)=>{
    const header = req.headers["authorization"]
    // console.log(header)
    try {
        jwt.verify(header,process.env.SECURITY_KEY,(err,user)=>{
            if(err){
                return res.status(400).json({msg:"invalid user",err})
            }
            req.id = user.id
            console.log(req.id)
        })
        next()
    } catch (error) {
        res.status(400).json({msg:error})
    }   
}


const userdata = async(req,res)=>{
    const userid = req.id
    const userdata = await usermodel.findById(userid,"-password")
    if(!userdata){
        return res.status(404).json({msg:"data not found"})
    }
    res.status(200).json({user:{userdata}})
}

exports.siginup =siginup
exports.verifytoken = verifytoken
exports.siginin = siginin
exports.userdata = userdata