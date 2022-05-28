const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
//previously we kept our objcet inside the model method but mongoose converts it to schema behind the scene .
//so we create a schema directly and keep the object within it which was in models before.
//then we pass the instance of schema to model
const userSchema=new mongoose.Schema(
    {
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
    }
)
userSchema.pre('save',async function(next){  //we dont use arrow fucntion since it prevents binding of this
    const user=this //this gives access to individual user before being saved

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
     
    next()
})

const User=mongoose.model('User',userSchema)



module.exports=User