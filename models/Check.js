const mongoose = require('mongoose');


const checkSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    URL:{
        type:String,
        required:true
    },
    isCheckActive:{
        type:Boolean,
        default:true
    }
    ,

    timeInterval: {
        type:Number,
        required:true,
        default:600
    },
    timeOut: {
        type:Number,
        required:true,
        default:5
    },
    
    threshold : {
        type:Number,
        required:true,
        default:1
    },
    tags:{
        type:[String]
    } ,
    webhook:{
        type:String,
        required:true,
        default:undefined
    },
     
})



module.exports=mongoose.model('Check',checkSchema);