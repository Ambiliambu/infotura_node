const jwt=require('jsonwebtoken')
const {Mentor}=require('../model/userModel')
const {Admin} =require('../model/adminModel')

const mentorprotect =async(req,res,next)=>{
    let token

   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
        //get token from header
        token=req.headers.authorization.split(' ')[1]

        //verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        //get user from the token
        req.mentor=await Mentor.findById(decoded.id).select('-password')

        next()

    }catch(error){
      console.log(error);
      res.status(401).json(error.message)
    }
   } 
   if(!token){
    res.status(401).json('No token')
   }
}




const adminprotect =async(req,res,next)=>{
  let token

 if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
  try{
      //get token from header
      token=req.headers.authorization.split(' ')[1]
      
      //verify token
      const decoded=jwt.verify(token,process.env.JWT_SECRET)
      console.log("decod",decoded);

      //get admin from the token
      req.admin=await Admin.findById(decoded.id).select('-password')
       console.log("req",req.admin)
      next()

  }catch(error){
    console.log("Error jwt",error.message);
    res.status(401).json(error.message)
    
  }
 } 
 if(!token){
  res.status(401).json('No token')
 }
}

module.exports={mentorprotect,adminprotect}