const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");

//create product -- admin
exports.createProduct = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user.id;
  // ye-> req.user hmare paas h kyunki isAuthorizedUser middleware ne request mein push krdiya user, toh vhaan se user ki id lekr req.body mein de di "user" field ko
  // hence product k saath user ki id bhi save hogyi ki ye product kis user ne create kiya h
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// fetch all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  console.log("----->" + JSON.stringify(req.query));
  const resultPerPage = 6;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  let products = await apiFeatures.query;

  let filteredProductsCount = products.length;

    apiFeatures.pagination(resultPerPage);
   products = await apiFeatures.query.clone();

  res
    .status(200)
    .json({ success: true, products, productsCount, resultPerPage,filteredProductsCount });
});

// updation of product -- admin
exports.updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
    // return res.status(404).send("Not Found..")
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //return the newer one as response
    runValidators: true, //taki jo rules model schema mein define kiye h wo updated data ko verify kr ske aur agar valid nhi hote h to update na kre!
    useFindAndModify: false, //ye kh rha h ki findAndModify() ko use nhi krna h, iski jgah new method findOneAndUpdate() apply kro kyunki ye newer version mein support krta h
  });
  res.status(200).json({ success: true, product });
});

exports.deleteProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
    // return res.status(404).send("Not Found..")
  }
  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, product });
});

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
    // return res.status(404).send("Not Found..")
  }
  res.status(200).json({ success: true, product });
});

// Q. why useFindAndModify:false?
// Ans.The findAndModify method is a more limited version of the newer methods. It can only perform one operation at a time, such as updating, deleting, or replacing a document, and it cannot be used to update multiple documents in a single query. In contrast, the newer methods offer more flexibility and functionality.

// Q. example of update multiple documents in a single query
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb://localhost:27017/yourdb";

// MongoClient.connect(uri, function(err, client) {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   const db = client.db("yourdb");
//   const collection = db.collection("products");

//   collection.updateMany(
//     { price: { $lt: 100 } }, // Match condition for documents to update
//     { $mul: { price: 1.1 } }, // Update operation, multiplies the price by 1.1 (increases by 10%)
//     function(err, result) {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log(`Updated ${result.modifiedCount} documents`);
//       }
//       client.close();
//     }
//   );
// });

// create new review or update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating), //kyunki kayi baar glti se string value aa jati h
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    //it will update the review if already did.
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review); //added new review to that product
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// get all reviews of single product
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete a review --- Admin
exports.deleteSingleReview = catchAsyncErrors(async (req, res, next) => {
  // firstly find product jiska delete krna h
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.body.id
  );
  const numOfReviews = product.reviews.length;
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings = 0;
  if (product.numOfReviews != 0) {
    ratings = avg / numOfReviews;
  }
  // await product.save({validateBeforeSave: false});//ye best practice nhi h kyunki ye pure product documnet to again save krega
  // so we use findByIdAndUpdate()
  await Product.findByIdAndUpdate(
    req.params.id,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true, //ye kh rha h ki return krna h nayi wali product
      runValidators: false,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
