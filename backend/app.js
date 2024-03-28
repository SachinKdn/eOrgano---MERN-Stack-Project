// Here we defined aur config our web server
const express = require("express");//create instance of Express application
const errorMiddleware = require("./middlewares/error");
const app = express();


const cookieParser = require('cookie-parser')
// this bodyParser is used to parse URL-encoded data ->is a middleware used in Express.js applications to parse incoming request bodies in a format that can be easily used by the application
const bodyParser = require("body-parser")
// When you upload a file, the file will be accessible from req.files.
const fileUpload = require("express-fileupload")
const path = require("path")
// config (ye hme jb jrurt pdti h jab hm server localhost pr ya npm run dev krke development/production mode mein chlare ho lekin in case npm run then iski jrurt nhi hoti, hosting platforms ka apna hona h)
// unki config.env ho github pr puch nhi krte na
if(process.env.NODE_ENV !== "PRODUCTION"){//ye built in nhi h (process.env.NODE_ENV) -> jo hositing platform hoga na uski env mein manually de denge taki yhaan constion check hojaye
  require("dotenv").config({path:"backend/config/config.env"})
}
// app.use(express.json()) // to fetch data from the request of body in the json format
app.use(express.json({
    limit: '10mb'
  }));
app.use(cookieParser()) // middleware is added to the Express application 
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())



// Route imports
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute");

app.use("/api/v1",product);
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)

// ye pr code likhne lg rha hu frontend ko attach krne ka
// frontend k build k baad
// app.use(express.static(path.join(__dirname,"../frontend/build")));
// app.get("*",(req,res)=>{
//   res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
// })


// app.get('/set-cookie', (req, res) => {
//     res.cookie("key","sachin")
//     // res.cookie('jwtToken', 'example-token', { httpOnly: true });
//     res.send('Cookie set successfully.');
//   });
// app.get('/get-cookie', (req, res) => {
//     let jwtToken = req.cookies.key;
//     res.send('JWT Token from cookie: ' + jwtToken);
//   });
app.get('/check',(req,res)=>{
  res.send('Cookie set successfully.');
})

// Middleware for error
app.use(errorMiddleware);

module.exports= app
