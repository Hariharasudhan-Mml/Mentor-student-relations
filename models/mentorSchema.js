const mongoose=require('mongoose');


const mentorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    experience:{
        type:Number,
        default:0
        
    },
    students:[{
        type:mongoose.Types.ObjectId,
        ref:'students',
        default:[]
        
    }]
})



const Mentor=new mongoose.model('mentors',mentorSchema);


module.exports=Mentor;
