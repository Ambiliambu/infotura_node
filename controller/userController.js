const {Mentor}=require('../model/userModel')
const bcrypt=require('bcryptjs')
const {generateToken}=require('../utils/generateToken');
const { Branch } = require('../model/adminModel');


const mentorRegister=async(req,res)=>{

    const {name,email,password,role,subject,course,qualification,schedule}=req.body;

    if( !email || !password || !role || !name || !subject || !course || !qualification ){
        res.status(400).json('Please add all field')    
    }
      
      //hash password
      const salt=await bcrypt.genSalt(10)
      const hashedPassword=await bcrypt.hash(password,salt)
  
       //create mentor
       try {
        
        const mentor=await Mentor.create({
            email,
            password:hashedPassword,
            role,
            name,
            subject,
            course,
            qualification
        })
        res.status(201).json(mentor)

       } catch (error) {
        res.status(400).json(error.message)
        
       }
    
}

//authenticate mentor
const mentorLogin=async(req,res)=>{
    const {email,password}=req.body
    
    //check mentor email
    const mentor=await Mentor.findOne({email})

    if(mentor && (await bcrypt.compare(password,mentor.password))){
        res.status(200).json({
            _id:mentor.id,
            email:mentor.email,
            role:mentor.role,
            name:mentor.name,
            subject:mentor.subject,
            course:mentor.course,
            qualification:mentor.qualification,
            token:generateToken(mentor._id)

        })

    }else{
        res.status(400).json('Not autherised')
     
    }    
}


const addSchedule=async(req,res)=>{
     
    if(req.mentor.role==='mentor'){

        try {
         const mentordata=await Branch.find({})
        //  console.log(mentordata);
         mentordata.forEach((value)=>{
            value.schedule.forEach(async(data)=>{
                // console.log(data);
                if(data.course===req.mentor.course && data.subject===req.mentor.subject && data.status ){
              const mentor=await Mentor.findByIdUpdate({_id:req.mentor._id},{$set:{"schedule":req.body}},{new:true})
              res.status(200).json(mentor)
                }
            })
         })
         
            
        } catch (error) {
            res.status(400).json(error.message)
        }


    }else{

        res.status(400).json('Not Mentor')
 
    }

}

module.exports={
    mentorRegister,
    mentorLogin,
    addSchedule,

}