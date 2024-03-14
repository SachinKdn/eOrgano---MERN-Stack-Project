const Order = require("../models/orderModel")
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// create new order
exports.neworder = catchAsyncErrors(async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;
    const order = await Order.create({
        shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,paidAt:Date.now(),user:req.user.id, 
    });
    // const order = await Order.create({
    //     shippingInfo,orderIems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,paidAt:Date.now(),user:req.user.id, 
    // });

    res.status(201).json({
        success:true,
        order
    })
})

// get single order with the help of orderID
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
   const order = await Order.findById(req.params.id)
   .populate("user","name email");//this method help to fetch name and email from user document by the help of user stored id in order document

   if(!order){
    next(new ErrorHandler("Order not found with this id",404));
   }

    res.status(201).json({
        success:true,
        order
    })
})

// get logged in user orders 
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user:req.user.id})
    
     res.status(201).json({
         success:true,
         orders
     })
 })

 // get all orders  -- Admin (Dashboard vaaste)
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    });
    
     res.status(201).json({
         success:true,
         orders,
         totalAmount
     })
 })

//  update order status --Admin
exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        next(new ErrorHandler("Order not found with this ID",404));
    }
    
    
    if(order.orderStatus === "Delivered"){
        next(new ErrorHandler("You have already delivered this order",400));
    }
    
    order.orderIems.forEach(async (order)=>{
        await updateStock(order.product,order.quantity);
    })
    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave:false})
    res.status(201).json({
         success:true,
         order
     })
 })

 async function updateStock(id,quantity){
    const product = await Product.findById(id);
    const stock =product.stock - quantity;
    await Product.findByIdAndUpdate(id,{
        stock
    },{
        new:true,//ye kh rha h ki return krna h nayi wali product
        runValidators:false,
        useFindAndModify:false
    })
 }

 //  delete order --Admin
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        next(new ErrorHandler("Order not found with this ID",404));
    }
    
    await order.remove();
    res.status(200).json({
        success:true,
        msg: "Order deleted successfully"
    })
 })