const mongoose=require('mongoose')
const validator=require('validator')

const User=mongoose.model('User',{
    name:{
        type:String
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        },
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:6,
        validate(value){
            if(value.includes('password')){
                throw new Error('must not contain the word password')
            }
        }
    }
})



module.exports=User