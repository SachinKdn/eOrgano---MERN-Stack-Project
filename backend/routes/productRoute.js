const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteSingleReview, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middlewares/auth");


const router = express.Router();

// router.route("/products").get(getAllProducts);
router.get('/products', getAllProducts);
router.get('/admin/products',isAuthenticatedUser ,authorizeRoles("admin"), getAdminProducts);
router.post('/admin/product/new',isAuthenticatedUser 
// ,authorizeRoles("admin")
,createProduct);
// router.put('/product/:id',updateProduct);
// router.delete('/product/:id',deleteProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser ,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser ,authorizeRoles("admin"),deleteProduct);
router.route('/product/:id').get(getProductDetails);
router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews/:id').get(isAuthenticatedUser, getAllReviews)
router.route('/admin/reviews/:id').delete(isAuthenticatedUser, deleteSingleReview)
module.exports = router;