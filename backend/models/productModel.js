const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter product Price"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0,
    },
    // [] why>> bcz images to array of object mein hee stored hongi na
    // jiske ek obj mein do chij hongi product_id and url
    images:[
    {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
],
    
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },
    stock:{
        type:String,
        required:[true,"Please enter product stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews : {
        type : [
        {
            user:{
            type:mongoose.Schema.ObjectId,//ye -> user ki id jisne iss product ko bnaya h
            ref:"User",
            required:true
            }
            ,
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
        ],
    // required:[true,"review khaan h "],
    },
    user:{
        type:mongoose.Schema.ObjectId,//ye -> user ki id jisne iss product ko bnaya h
        ref:"User",
        required:true
    }
    ,
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Product",productSchema);

// if you want to make the images required.....
// const imageSchema = new mongoose.Schema({
//     public_id: {
//       type: String,
//       required: true,
//     },
//     url: {
//       type: String,
//       required: true,
//     },
//   });
  
//   const yourSchema = new mongoose.Schema({
//     // Other fields in your schema
    
//     images: {
//       type: [imageSchema], // This defines an array of objects with the imageSchema structure
//       required: true, // Makes the "images" field required
//     },
//   });

// array of string in cateogry
// in json body>>
// "category": ["Category1", "Category2", "Category3"]
// category: {
//     type: [String], // This defines an array of strings
//     required: true, // Makes the "category" field required
//   },