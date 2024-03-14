// create token and saving in cookie
const sendToken = (user,statusCode,res)=>{
    const token = user.getJWTToken();
    console.log("new token from getJWTToken()--->"+ token)
    // options for cookie
    const option = {
        expires:new Date(
            Date.now() + (process.env.COOKIE_EXPIRE * 24*60*60*1000)
        ),
        httpOnly:true,   
    }
    
    
    res.status(statusCode).cookie('token',token,option).json({ //i.e. res.cookie('token',token) to send the cookie to browser(client) which is saved for given time
        success:true,
        user,
        token,
    })
}

module.exports  = sendToken;