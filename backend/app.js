// Here we defined aur config our web server
const express = require("express");//create instance of Express application
const errorMiddleware = require("./middlewares/error");
const app = express();

const dotenv = require("dotenv");
const cookieParser = require('cookie-parser')
// this bodyParser is used to parse URL-encoded data ->is a middleware used in Express.js applications to parse incoming request bodies in a format that can be easily used by the application
const bodyParser = require("body-parser")
// When you upload a file, the file will be accessible from req.files.
const fileUpload = require("express-fileupload")

// config
dotenv.config({path:"backend/config/config.env"})
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

// app.get('/set-cookie', (req, res) => {
//     res.cookie("key","sachin")
//     // res.cookie('jwtToken', 'example-token', { httpOnly: true });
//     res.send('Cookie set successfully.');
//   });
// app.get('/get-cookie', (req, res) => {
//     let jwtToken = req.cookies.key;
//     res.send('JWT Token from cookie: ' + jwtToken);
//   });

// Middleware for error
app.use(errorMiddleware);

module.exports= app