import React, { Fragment, useEffect, useState } from "react";
import "./products.css";
import Loader from "../layout/Loader/loader";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Product from "../Home/Product";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {useAlert} from "react-alert"

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [tempPrice, setTempPrice] = useState([0, 250000]); //ye ek array bnai h
  const [price, setPrice] = useState([0, 250000]); //ye ek array bnai h
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ratings, setRatings] = useState(0)
  // const priceHandler = (event, newPrice) => {
  //   setPrice(newPrice);
  // };
  const priceHandler = (event, newPrice) => {
    setTempPrice(newPrice);
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  let { keyword } = useParams();
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  let count = filteredProductsCount;
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category,ratings));
  }, [dispatch, error, keyword, currentPage, price, category,ratings,alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">ALL PRODUCTS</h2>
          <div className="products">
            {/* {products && products.map((product)=>(
                <Product key={product._id} product={product}/>
            ))} */}
            {products[0] ? (
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))
            ) : (
              <h4 className="noProductFound">No Product Found !!</h4>
            )}
          </div>
          <div className="filterBox">
            <Typography className="priceBox">
              Price
              <button className="priceButton" onClick={()=>setPrice(tempPrice)}>Apply</button>
            </Typography>
            <Slider
              className="slider"
              value={tempPrice}
              onChange={priceHandler}
              valueLabelDisplay="on"
              // valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              step={5000}
              min={0}
              max={250000}
            />
            <Typography >Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                className={`category-link ${selectedCategory === category ? 'active' : ''}`}
                key={category}
                  onClick={() => {
                    setCategory(category)
                    setSelectedCategory(category)
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend" variant="caption">Ratings Above</Typography>
              <Slider
              value={ratings}
              onChange={(e,newRating)=>{
                setRatings(newRating);
              }}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider"
              min={0}
              max={5}
              />
            </fieldset>
          </div>

          {count > resultPerPage && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
