import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { clearErrors, getAllReviews, getProductDetails, newReview } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useParams , useNavigate} from "react-router-dom";
import ReviewCard from "./ReviewCard.js";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import Loader from "../layout/Loader/loader";
import { addItemsToCart } from "../../actions/cartAction";
import { NEW_REVIEW_RESET } from "../../constants/prodctConstants";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  
  const dispatch = useDispatch();
  let { id } = useParams();
  const alert = useAlert();


  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addToCart = ()=>{
    dispatch(addItemsToCart(id,quantity))
    alert.success("Item Added To Cart")
    navigate('/products')
  }
  const options = {
    readOnly:true,
    value: product.ratings,
    precision:0.5,
    size:"large"
  };
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getAllReviews(id))
    dispatch(getProductDetails(id));
  }, [dispatch, id,error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="productDetails">
            <div>
              <Carousel
                className="c1"
                navButtonsAlwaysVisible
                interval={3000}
                animation="slide"
                duration={1000}
                navButtonsProps={{
                  // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                  style: {
                    backgroundColor: "#494949d4",
                    borderRadius: 50,
                  },
                }}
              >
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="div1">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>${product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button disabled={product.stock < 1 ? true:false} onClick={addToCart}>Add To Cart</button>
                </div>
                <p>
                  Stock:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out Of Stock" : `${product.stock}`}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description:
                <p>{product.description}</p>
              </div>

              <button className="submitReview" onClick={handleClickOpen}>Write A Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}


<Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{     // Props applied to the Paper element.
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            // const formJson = Object.fromEntries(formData.entries());
            // const email = formJson.email;
            // console.log(email);
            handleClose();
            // const myForm = new FormData();

    // myForm.set("rating", rating);
    // myForm.set("comment", comment);
    formData.set("productId", id);
    formData.set("rating", rating);
console.log(rating)
    dispatch(newReview(formData));

          },
        }}
        style={{textAlign:"center"}}
      >
        <DialogTitle style={{ fontFamily:"Lexend",textAlign:"center"}}>Add New Review</DialogTitle>
        <DialogContent>
          <DialogContentText  style={{ fontFamily:"Roboto",textAlign:"center" , marginBottom:"1.2vmax"}}>
            Please enter your valuable review here
          </DialogContentText>
          
<Typography component="legend">Review with stars</Typography>
<Rating name="ratingInput" onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large" />
          <TextField
            autoFocus
            required
            margin="dense"
            id="comment"
            name="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
