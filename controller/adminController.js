const {Admin, Course, Subject, Branch}=require('../model/adminModel')
const bcrypt=require('bcryptjs')
const {generateToken}=require('../utils/generateToken')

const adminRegister=async(req,res)=>{

    const {email,password,role}=req.body;

    if( !email || !password || !role){
        res.status(400).json('Please add all field')    
    }
      
      //hash password
      const salt=await bcrypt.genSalt(10)
      const hashedPassword=await bcrypt.hash(password,salt)
  
       //create Admin
       try {
        
        const admin=await Admin.create({
            email,
            password:hashedPassword,
            role
        })
        res.status(201).json(admin)

       } catch (error) {
        res.status(400).json(error.message)
        
       }
    
}

//authenticate admin
const adminLogin=async(req,res)=>{
    const {email,password}=req.body
    
    //check admin email
    const admin=await Admin.findOne({email})

    if(admin && (await bcrypt.compare(password,admin.password))){
        res.status(200).json({
            _id:admin.id,
            email:admin.email,
            role:admin.role,
            token:generateToken(admin._id)

        })

    }else{
        res.status(400).json(error.message)
     
    }    
}


const addCourse=async(req,res)=>{

    if(req.admin.role==='admin'){
        const {name}=req.body
        if(!name){
            res.status(400).json ('Please add all field')
           
        }
       // check it exist
        const courseExist=await Course.findOne({name})
        if(courseExist){
            res.status(400).json(' Course already exist')  
        }
        //create course
         try {
            const course=await Course.create({
                name
            })
            res.status(201).json(course)
         } catch (error) {
            res.status(400).json(error.message)
         }

    }else{
        res.status(400).json('Not Admin')

    }
   
}

const addSubject=async(req,res)=>{

    if(req.admin.role==='admin'){
        const {name,topics}=req.body

        if(!name || !topics){
            res.status(400).json ('Please add all field')
           
        }
       // check it exist
        const subjectExist=await Subject.findOne({name})
        if(subjectExist){
            res.status(400).json(' Subject already exist')  
        }

        //create subject
         try {
            const subject=await Subject.create({
                name,
                topics
            })
            res.status(201).json(subject)
         } catch (error) {
            res.status(400).json(error.message)
         }

    }else{
        res.status(400).json('Not Admin')
    }
}


const addBranch=async(req,res)=>{

    if(req.admin?.role==='admin'){
        const {name,schedule}=req.body

        if(!name || !schedule){
            res.status(400).json ('Please add all field')
           
        }
       // check it exist
        const branchExist=await Branch.findOne({name})
        if(branchExist){
            res.status(400).json(' Branch already exist')  
        }

        //create branch
         try {
            const branch=await Branch.create({
                name,
                schedule
            })
            res.status(201).json(branch)
         } catch (error) {
            res.status(400).json(error.message)
         }

    }else{
        res.status(400).json('Not Admin')
    }
}


const updateBranchSchedule=async(req,res)=>{
    console.log("oooo");
    if(req.admin?.role==='admin'){

        const {schedule,status}=req.body

         try {
            const branch=await Branch.findByIdAndUpdate(req.params.Id,{$set:{"schedule":schedule}},{new:true})
            res.status(201).json(branch)
         } catch (error) {
            res.status(400).json(error.message)
         }

    }else{
        res.status(400).json('Not Admin')
    }
}


module.exports={
    adminRegister,
    adminLogin,
    addCourse,
    addSubject,
    addBranch,
    updateBranchSchedule


}
