const mongoose = require('mongoose');
const {isEmail}=require('validator');
const bcrypt =require('bcrypt');
const Schema=mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:[true,'*Email is required'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'*Please enter Valid email']
    },
    password:{
        type:String,
        required:[true,'*Password is required'],
        lowercase:true,
        minlength:[6,'*Minimum 6 characters required']
    }
});

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();   
        this.password=await bcrypt.hash(this.password,salt);
    next();
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        const auth = bcrypt.compare(password,user.password)
        //console.log(user.password)
        if(auth){return user;}
        
        throw Error('*Incorrect Password');
    }
    
    throw Error('*Email not registered');
}


 

const User = mongoose.model('users',userSchema);
module.exports=User;