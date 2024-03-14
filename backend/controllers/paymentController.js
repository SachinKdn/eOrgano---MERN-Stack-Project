//i) sabse phle to stripe pr account and then goto dashboard to copy keys
//ii) paste keys in env file
//iii) installin root folder "npm i stripe"


const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const stripe = require('stripe')('sk_test_51OsSyrSDivLajdbVLsiS9v1qkJCmELAcpxSbxbBDxRxf5FYYnFF1VuwApeogGzagwMqZjHotWgQq0geMAw6RoImC00cOg6lM0n');


exports.processPayment = catchAsyncErrors(async(req,res,next)=>{
    // const myPayment = await stripe.paymentIntents.create({
        // amount:req.body.amount,
        // currency:"inr",
        // metadata:{
        //     company:"eOrgano"
        // }
    // })
    // const paymentIntent = await stripe.paymentIntents.create({
    //     amount: 500,
    //     currency: 'gbp',
    //     payment_method: 'pm_card_visa',
    //   });
    let paymentIntent;
    try{
        paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency:"INR",
        description: 'Software development services',
        shipping: {
            name: 'Sachin',
            address: {
              line1: '510 Townsend St',
              postal_code: '98140',
              city: 'San Francisco',
              state: 'CA',
              country: 'US',
            },
        },
        metadata:{
            company:"eOrgano"
        },
        automatic_payment_methods: {
          enabled: true,
        }
      });
    }catch(error){
        console.log("Error-----------------------------------------")
        console.log(error.message)
    }
    res.status(200).json({
        success:true,
        client_secret:paymentIntent.client_secret
    })
})


exports.sendStripeApiKey = catchAsyncErrors(async(req,res,next)=>{
    console.log("stripe called")
    res.status(200).json({
        stripeApiKey:process.env.STRIPE_API_KEY
    })
})


