const mongoose=require('mongoose')
const validator=require('validator')
 
 const Tasks=mongoose.model('Tasks',{
        task:{
            type:String,
            trim:true
        },
        description:{
            type:String
        },
        email:{
            type:String,
            required:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is envalid')
                }
            },
            lowercase:true
        },
        completed:{
            type:Boolean
        }
    })
    
    
module.exports=Tasks