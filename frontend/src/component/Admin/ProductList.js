import React, { Fragment, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css";
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Slider from "./Slider.js";
import { clearErrors, deleteProduct, getAdminProduct } from '../../actions/productAction';
import { DELETE_PRODUCT_RESET } from '../../constants/prodctConstants';

const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector(
      (state) => state.product
    );
    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }

        if (deleteError) {
          alert.error(deleteError);
          dispatch(clearErrors());
        }
    
        if (isDeleted) {
          alert.success("Product Deleted Successfully");
          // navigate("/admin/dashboard")
          dispatch({ type: DELETE_PRODUCT_RESET });
        }
    
        dispatch(getAdminProduct());
      }, [dispatch, alert, error,deleteError, navigate, isDeleted]);

      const deleteProductHandler = (id)=>{
        dispatch(deleteProduct(id))
      }

      const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 350,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 270,
          flex: 0.5,
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
                <Link to={`/admin/product/${params.value}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteProductHandler(params.value)
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

      products &&
        products.forEach((item) => {
          rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name,
          });
        });
    
  return (
    <Fragment>

      <div className="dashboard">
        <Slider />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>

  )
}

export default ProductList