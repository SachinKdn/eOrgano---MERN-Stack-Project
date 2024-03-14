const mongoose = require("mongoose");


const connectDatabase = ()=>{

    mongoose.connect(process.env.DB_URI).then((data)=>{
    console.log("Mongodb connected with server " + data.connection.host)
    })
    // .catch((err)=>{
    //     console.log(err.message +  "   erro!!!");
    // }) //now we don't need of this because I handle this in server.js file using unhandlesRejection event state
}

module.exports = connectDatabase;