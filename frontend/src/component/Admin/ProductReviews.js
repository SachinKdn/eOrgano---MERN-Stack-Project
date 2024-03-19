import Slider from "./Slider.js";
import { DataGrid } from '@mui/x-data-grid';
import { useAlert } from "react-alert";
import { useNavigate, useParams } from 'react-router-dom';
import React, { Fragment, useState, useEffect } from "react";
import Star from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../layout/Loader/loader'
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_REVIEW_RESET } from "../../constants/prodctConstants";
import { Button } from "@material-ui/core";
import "./productReviews.css"

import {
    clearErrors,
    getAllReviews,
    deleteReviews,
  } from "../../actions/productAction";

const ProductReviews = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    
    
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.review
      );
    
      const { error, reviews, loading } = useSelector(
        (state) => state.allReviews
      );
    
      const [productId, setProductId] = useState("");
    
      const deleteReviewHandler = (reviewId) => {
        if(!productId){
            alert.error("Product Id is not found.")
        }
        dispatch(deleteReviews(reviewId, productId));
      };
    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
      };
    
      useEffect(() => {
        if (productId.length === 24) { //ye uske lye h ki agar productID dependency mein ho to hrr baar re-render na ho jb 24 len ho tbhi ho bsss 
          dispatch(getAllReviews(productId));
        }
        if (error) {
          alert.error(error.message);
          dispatch(clearErrors());
        }
    
        if (deleteError) {
          alert.error(deleteError.message);
          dispatch(clearErrors());
        }
    
        if (isDeleted) {
          alert.success("Review Deleted Successfully");
        //   history.push("/admin/reviews");
          dispatch({ type: DELETE_REVIEW_RESET });
        }
      }, [dispatch, alert, error, deleteError, isDeleted]);
    
      const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "user",
          headerName: "User",
          minWidth: 200,
          flex: 0.6,
        },
    
        {
          field: "comment",
          headerName: "Comment",
          minWidth: 350,
          flex: 1,
        },
    
        {
          field: "rating",
          headerName: "Rating",
          type: "number",
          minWidth: 180,
          flex: 0.4,
          cellClassName: (params) => {
            return params.value >= 3
              ? "greenColor"
              : "redColor";
          },
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          valueGetter: (params) => params.row.id,//ye use hota h value ko lene k liye from other columns return -> string only
          renderCell: (params) => {
            return (
              <Fragment>
                <Button
                  onClick={() =>
                    deleteReviewHandler(params.value)
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
    
    const rows = [];

    reviews &&
      reviews.forEach((item) => {
        rows.push({
          id: item._id,
          rating: item.rating,
          comment: item.comment,
          user: item.name,
        });
      });
    return (
        <Fragment>

            <div className="dashboard">
                <Slider />

                {loading ? (
                    <Loader />
                ) : (
                    <div className="adminDisplay">
                        <div className="reviewSearchBox">
                            <h2 className="updateProfileHeading">Search Reviews</h2>

                            <form
                                className="searchForm"
                                onSubmit={productReviewsSubmitHandler}
                            >
                                <div>
                                    <Star />
                                    <input
                                        type="text"
                                        placeholder="Product ID"
                                        required
                                        value={productId}
                                        onChange={(e) => setProductId(e.target.value)}
                                    />
                                </div>

                                <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
                                
                            </form>
                        </div>
                        <div>
                        {reviews && reviews.length > 0 ? (
                            <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                            />
                        ) : (
                            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                        )}
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default ProductReviews