import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import "./productDetails.css";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useParams , useNavigate} from "react-router-dom";
import ReviewCard from "./ReviewCard.js";

import Loader from "../layout/Loader/loader";
import { addItemsToCart } from "../../actions/cartAction";

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

  const addToCart = ()=>{
    dispatch(addItemsToCart(id,quantity))
    alert.error("Item Added To Cart")
    navigate('/products')
  }
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id,alert,error]);

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
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>${product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button disabled={product.stock < 1 ?true:false} onClick={addToCart}>Add To Cart</button>
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

              <button className="submitReview">Write A Review</button>
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
