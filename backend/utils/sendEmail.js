const nodemailer = require("nodemailer");

const sendMail = async(options)=>{
// you can use email testing service ka like mailtry vgera but these are not good and efficient
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587, //default port for SMTP is 587 if secure is false for encrypted email transmission using SMTP secure (SMTPS)
        // port:465, //secure should be true for 465 port no. (NOT RECOMMANDED)
        secure:false,
        service : process.env.SMTP_SERVICE,
        auth : {
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }        
    });
    
    const mailOptions = {
        // from:process.env.SMTP_MAIL,
        from:`"Sachin Kadian" <${process.env.SMTP_MAIL}>`,// sender address
        // to:"sklovelyjatt2018@gmail.com",// list of receivers
        to:options.email,// list of receivers
        subject:options.subject,// Subject line
        text:options.message,// plain text body
        // html:`<!DOCTYPE html>
        // <html lang="en">
        
        // <head>
        //     <meta charset="UTF-8">
        //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //     <title>Your Website Title</title>
        //     <style>
        //         /* Add your custom CSS styles here */
        //         body {
        //             font-family: Arial, sans-serif;
        //             margin: 0;
        //             padding: 0;
        //             box-sizing: border-box;
        //         }
        
        //         header {
        //             background-color: #333;
        //             color: white;
        //             padding: 1em;
        //             text-align: center;
        //         }
        
        //         main {
        //             padding: 20px;
        //         }
        
        //         footer {
        //             background-color: #333;
        //             color: white;
        //             text-align: center;
        //             padding: 1em;
        //             position: fixed;
        //             bottom: 0;
        //             width: 100%;
        //         }
        //     </style>
        // </head>
        
        // <body>
        
        //     <header>
        //         <h1>OM DESHWAL 👻</h1>
        //     </header>
        
        //     <main>
        //         <section>
        //             <h2>LOST! LOST! LOST!</h2>
        //             <img src="https://github.com/SachinKdn/data/blob/main/Snapchat-1691146200.jpg?raw=true" alt="Description of the image">
        
        //             <p style="font-family: 'Times New Roman', Times, serif; 
        //             color: #2a80b9;
        //             font-weight: bold;
        //             font-size: 18px;
        //             ">🤗YE TAKLU H, aur By Mistake my bestie, I don't know kyu m isski baaton mein aa jata hu lekin khair chodo😎</p>

        //             <h2 style="color: #b92a80;">Lost Person Details</h2>
        //             <h4> Harktein to nhi h iski aesi ki isko dhunda jaaye lekin khair chodo 🤭</h4>
        //             <p style="font-family: 'Times New Roman', Times, serif; 
        //             color: #333;
        //             font-weight: bold;
        //             font-size: 18px;
        //             ">Name: OM DESHWAL</p>
        //             <p style="font-family: 'Times New Roman', Times, serif; 
        //             color: #333;
        //             font-weight: bold;
        //             font-size: 18px;
        //             ">Age: 23</p>
        //             <p style="font-family: 'Times New Roman', Times, serif; 
        //             color: #333;
        //             font-weight: bold;
        //             font-size: 18px;
        //             ">Address: Vill. Alduka (Bihar)</p>
        //             <h2 style="color: #b92a80;">Contact Details : 9319480278 </h2>
        //             <small>Agar iski skll dekh kr koi dyaa aa jaaye ko, khair chodo🤭🤭</small>
        //         </section>
        //     </main>
        
        //     <footer>
        //         <p> Reply Dena H khiin isko dekha ho to aese he chdd de</p>
        //     </footer>
        
        // </body>
        
        // </html>`
        
        // html:`<b>Hello SKT tyres......😁🤣🤣</b><br><h1>Sachin Kadian Bhai</h1><br><br><h4 style="color:red;">Om Deshwal</h4>`// html body
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("***Message sent: %s", info.messageId);
}

module.exports = sendMail;