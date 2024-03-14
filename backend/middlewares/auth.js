const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken')
const User = require("../models/userModel");


exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    // res.cookie('name',"sachin");
    const jwtToken = req.cookies.token;
    console.log("------->"+jwtToken)
    const {token} = req.cookies; //we know login k time pr cookie mein stored h token, aur yhaan pr fetch kr rhe h cookie se
    if(!token){
        return next(new ErrorHandler("Please Login to access this resource (token not found from cookie)",401))
    }
    console.log("token from cookie--->"+ token )
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    console.log("current user id:- " + decodedData.id)
    req.user = await User.findById(decodedData.id); //ye request body mein user ka data store krdiya jb bhi jrurt pdegi use krlenge

    next();
})

exports.authorizeRoles = (...roles)=>{
// triple dots k baad roles liya h to ye ek array h jisme sirf ek "admin" element h
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403)) //server understand what you want but refused kyunki status code nhi diya tha phle
        }

        next();
    }
}