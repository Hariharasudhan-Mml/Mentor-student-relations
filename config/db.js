const mongoose=require('mongoose');

const DBconnect=async function(){
try{
    const connection=await mongoose.connect('mongodb+srv://hari:19caa2705@cluster0.dgtns.mongodb.net/Relations?retryWrites=true&w=majority');
    console.log("DB connected to-"+connection.connection.host);
}
catch{err=>{
    console.log(err);
}}
}


module.exports=DBconnect;