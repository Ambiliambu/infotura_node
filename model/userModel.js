const mongoose=require('mongoose')

//mentor signup

const mentorSchema=mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subject',
        required:true
    },
    role:{
        type:String,
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },
    schedule:[{
        topic:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Subject.topic'
                 
        },
        subject:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Subject'
        },
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        },
        branch:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Branch'
        },
        
    }],
    qualification:{
        type:String,
        required:true
    }
})


const Mentor=mongoose.model('Mentor',mentorSchema)

module.exports={Mentor}