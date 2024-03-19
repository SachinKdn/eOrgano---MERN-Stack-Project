const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto')//ye built in h install nhi krna pdta
const cloudinary = require("cloudinary")

// register a user
exports.registerUser = catchAsyncErrors(async (req,res,next)=>{
    if(!req.body.avatar){
        const {name,email,password} = req.body;
        const user = await User.create({
            name,email,password,avatar:{
                public_id:"null",
                url:"null",
            }
        });
        
    sendToken(user,201,res)
    }else{
        try{
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
                folder:"avatars",
                // width:550,//resize it to a width of 150 pixels,
                crop:"scale",//maintain the original aspect ratio.
            })
            const {name,email,password} = req.body;
            const user = await User.create({
            name,email,password,avatar:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            }
        });
        sendToken(user,201,res)
        }catch(error){
            console.log("Error-----------------------------------------")
            console.log(error.message)
        }
       
        
    }
    // const {email} = req.body;
    // checking if user is already with this email 
    // const tempUser = User.findOne({email});
    // if(tempUser){
    //     return next(new ErrorHandler("User Is Already Exists",401))  // 400->request failed
    // }

    // const {name,password} = req.body;

    
})

// login user
exports.loginUser = catchAsyncErrors(async (req,res,next)=>{
    
    const {email,password} = req.body;

    // checking if user has given email & password both
    if(!email || !password){
        return next(new ErrorHandler("Enter all credentials",400))  // 400->request failed
    }

    const user =await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Enter correct credentials!!",401))    // 401->unauthorized
    }

    const isPasswordMatched =await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Enter correct credentials!!",401))    // 401->unauthorized
    }
    // user.demofun();
    sendToken(user,200,res)
})


// logout user
exports.logout = catchAsyncErrors(async (req,res,next)=>{
    // await req.cookie("key","sachin");
    // console.log(req.cookies.key)
    // ye response k saath cookie ka data bhj diya jo already present cookie ko override krdega aur tbhi ki tbhi cookie expire hojayegi kyunki expires:now kiya h 
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
 

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })

    // res.status(200).cookie('token',null,{
    //     expires:new Date(Date.now()),
    //     httpOnly:true
    // }).json({ //i.e. res.cookie('token',token) to send the cookie to browser(client) which is saved for given time
    //     success:true,
    //     message:"Logged Out"
    // })
})


// forgot password mailer
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    // get reset password token ->jo userModel mein bnaya h function
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});//ye save kiya h kyunki jo method of token generate call kiya h to usne schema mein token bna to diya lekin usko abhi tk save nhi kiya i document of user mein kyunki user to phle he bna hua tha
    
    const resetPasswordUrl = `${process.env.HOST_URL}/password/reset/${resetToken}`;
    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    const message = `Your password reset token is : \n\n ${resetPasswordUrl} \n\n If you have not requested this mail then, please ignore it.`;

    try{

        // ye ek sendEmail() bna diya jo call hoga taki NodeMailer package email send kr ske...
        await sendEmail({
            email:`${user.email}`,
            subject: "Eorgano Password Recovery",
            message
        });

        res.status(200).json({
            success:true,
            message:`Email successfully sent to ${user.email}`
        })
    }catch(error){
        user.resetPasswordToken = undefined;//agar hmne inko undefined krdiya to ye DB se chli jati h na ki undefined contain krke rkhti h
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message,500));
    }
})

exports.resetPassword = catchAsyncErrors(async (req,res,next)=>{

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken
        ,
        resetPasswordExpire : { $gt : Date.now()}
    })
    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired.",400))
    }

    if(req.body.password != req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match.",400))  
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    if(user.password.length < 6){
        return next(new ErrorHandler("Password should be bigger",400)) 
    }
    await user.save();
    sendToken(user,200,res)//taki jwt token cookie mein store ho jaye or user auto login ho jaye
})

// get user details
exports.getUserDetails = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
    
})

// update password
exports.updatePassword = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password');
    const {password} = req.body;
    const isPasswordMatched =await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400))    // 401->unauthorized
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't matched",400))
    }

    user.password = req.body.newPassword;
    if(user.password.length < 6){
        return next(new ErrorHandler("Password should be bigger",400)) 
    }
    await user.save();
    // sendToken(user,200,res)
    res.status(200).json({
        success:true,
        user
    })
    
})

// update user detais
exports.updateProfile = catchAsyncErrors(async (req,res,next)=>{
    if(!req.body.avatar){

        const newUserData = {
            name: req.body.name,
            email: req.body.email,
    
        };
        const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false 
        })
        res.status(200).json({
            success:true,
            user
        })
    }else{
        const user1 = await User.findById(req.user.id);

    const imageId = user1.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            // width:550,//resize it to a width of 150 pixels,
            crop:"scale",//maintain the original aspect ratio.
        })
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            avatar:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            }
        };
        const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false 
        })
        res.status(200).json({
            success:true,
            user
        })
    }
    // const newUserData = {
    //     name: req.body.name,
    //     email: req.body.email,

    // };

    // we will add cloudnary later (profile pic)
    
    // const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    //     new:true,
    //     runValidators:true,
    //     useFindAndModify:false 
    // })
    // res.status(200).json({
    //     success:true,
    //     user
    // })
    
})

// get all users for admin
exports.getAllUser = catchAsyncErrors(async (req,res,next)=>{
    
    const users = await User.find()
    res.status(200).json({
        success:true,
        users
    })
    
})

// get single user for admin
exports.getSingleUser = catchAsyncErrors(async (req,res,next)=>{
    
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User not found",404))
    }
    res.status(200).json({
        success:true,
        user
    })
    
})

// update user role details -- Admin
exports.updateUserRole = catchAsyncErrors(async (req,res,next)=>{
    console.log(req.body)
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role:req.body.role
    };
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false 
    })
    res.status(200).json({
        success:true,
        user
    })
    
})

// delete user -- Admin
exports.deleteUser = catchAsyncErrors(async (req,res,next)=>{
    
    let user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("User doesn't exist.",404))
    }
    // method-1 to delete
    // await user.remove();
    // res.status(200).json({
    //     success:true,
    //     msg: "User deleted successfully"
    // })
    if(user.avatar.url !== null){
        const imageId = user.avatar.public_id;   
        await cloudinary.v2.uploader.destroy(imageId);
    }
    // method-2 to delete
    user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        user
    })
})


