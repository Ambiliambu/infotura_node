const mongoose=require('mongoose')


const adminSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})


const subjectSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    topics:[{
       topicname:{
        type:String,
        required:true
       },
       hour:{
        type:String,
        required:true
       }
    }]
})


const courseSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

const branchSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    schedule:[{
        subject:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Subject',
            required:true

        },
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course',
            required:true
        },
        time:{
            type:String,
            required:true
        },
        status:{
            type:Boolean,
            required:true,
            default:false
        }

    }]
})

const Admin=mongoose.model('Admin',adminSchema)
const Subject=mongoose.model('Subject',subjectSchema)
const Course=mongoose.model('Course',courseSchema)
const Branch=mongoose.model('Branch',branchSchema)




module.exports={Admin,Subject,Course,Branch}

