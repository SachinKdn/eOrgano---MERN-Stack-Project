const mongoose = require('mongoose')
const validator = require('validator')
// express-validator
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')//ye built in h install nhi krna pdta

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter Your Name "],
        maxLength:[30,"Name cannot be exceed 30 characters"],
        minLength:[4,"Name : {VALUE} should have more than 4 characters "]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
    //     validate:[(value) => {
    //         console.log("This is called from userModel---" +  value)
    //         return value.length;
    //       },"sachin message"
    //   ]
        // validate:[validator.isEmail,"Please Enter Correct Email"],
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[6,"Name should have more than 6 characters"],
        select:false,// jab developer/admin mongodb compass mein aakr bhi users ko access krega to password ko chd kr sari chije de dega
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    resetPasswordToken: String,
    resetPasswordExpire:Date,
});
// why we using function(){} here bcz in arrow func we can't use this keyword


// jb bhi ye userrschema save hoga usse phle (yhhan se ek pre process generate krdi)
userSchema.pre("save",async function(next){
    
    
    if(!this.isModified("password")){
        next();
    }


    this.password = await bcrypt.hash(this.password,10);

})


// JWT token
userSchema.methods.getJWTToken = function (){
    console.log("Token created for id:- "+this._id)
    return jwt.sign({id:this._id},process.env.JWT_SECRET
        ,{
            expiresIn:process.env.JWT_EXPIRE,//ye jwt token itne din mein expire hoyega i.e. itne din baad aapko re-login krna pdega
    }
    )
}

// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//generating password reset token
userSchema.methods.getResetPasswordToken = function(){
//generating token
const resetToken = crypto.randomBytes(20).toString("hex");

//Hashing and adding resetPasswordToken to userSchema
this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

console.log("Your Saved token is : " + this.resetPasswordToken)
this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
console.log("Your final token is : " + resetToken)
return resetToken;//ab nodemailer ka use krke mail bhjne ki tyari krenge 

}

// demo
userSchema.methods.demofun = function(){
    console.log("this is demo function from userSchema")
}

module.exports = mongoose.model("User",userSchema)