const express=require('express')
const { mentorRegister, mentorLogin, addSchedule } = require('../controller/userController')
const router=express.Router()
const {mentorprotect}=require('../middleware/authMiddleware')


router.post('/mentorregister',mentorRegister)
router.post('/mentorlogin',mentorLogin)
router.post('/addschedule',mentorprotect,addSchedule)



module.exports= router