const express=require('express')
const { adminRegister, adminLogin, addCourse, addSubject, addBranch, updateBranchSchedule } = require('../controller/adminController')
const router=express.Router()
const {adminprotect}=require('../middleware/authMiddleware')

router.post('/adminregister',adminRegister)
router.post('/adminlogin',adminLogin)

router.post('/addcourse',adminprotect,addCourse)
router.post('/addsubject',adminprotect,addSubject)
router.post('/addbranch',adminprotect,addBranch)
router.patch('/updatebranch/Id',adminprotect,updateBranchSchedule)










module.exports= router