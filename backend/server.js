const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")
const cloudinary = require("cloudinary")
// config
dotenv.config({path:"backend/config/config.env"})
// handle uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting Down Your Server...");
    process.exit(1);
})

// connect with db
connectDatabase()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
// lets start a server
// listen to the specified port = process.env.PORT
// app.listen(port, callback)
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})  

// UnhandledPromiseRejections
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the error...")

    server.close(()=>{
        process.exit(1);
    })
})





