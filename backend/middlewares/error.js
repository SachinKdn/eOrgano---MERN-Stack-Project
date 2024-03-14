const ErrorHandler = require("../utils/errorHandler");
module.exports = (err,req,res,next)=>{
    console.log(err.statusCode)
    err.statusCode = err.statusCode || 550;
    err.message = err.message || "Internal Server Error"

    if(err.message === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    // mongoose duplicate error modification
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message,400);
    }

    // wrong JWT token entered error
    if(err.name === 'JsonWebTokenError'){
        const message = `JSON web token is invalid, Try again`;
        err = new ErrorHandler(message,400);
    }

    //  JWT expire error
    if(err.name === 'TokenExpiredError'){
        const message = `JSON web token is expired, Try again`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        error:err.message,
        statusCode:err.statusCode,
        stack:err.stack  //for more info of error
    })

}