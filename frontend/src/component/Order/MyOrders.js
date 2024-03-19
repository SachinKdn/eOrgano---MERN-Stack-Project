import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
// import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          // cellClassName:"greenColor"
          cellClassName: (params) => {
            return params.value === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "amount",
          headerName: "Amount",
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

        //   valueGetter: (params) => {
        //     // if (!params.value) {
        //     //   return params.value;
        //     // }
        //     // // Convert the decimal value to a percentage
        //     // return params.value * 100;
        //     return (
        //         // <Link to={`/order/${params.getValue(params.id, "id")}`}>
        //         <Link to={`/order/${params.row.status}`}>
        //           <LaunchIcon />
        //         </Link>
        //       );
        //   },
        // renderCell return-> reactElement jo HTML code ko return krta h (we can say)
          renderCell: (params) => {
            return (
              <Link to={`/order/${params.value}`}>
              {/* <Link to={`/order/${params.getValue(params.id, "id")}`}> */}
                <LaunchIcon />
              </Link>
            );
          },
        },
      ];
      const rows = [];
      orders &&
      orders.forEach((item, index) => {
        rows.push({
          itemsQty: item.orderItems.length,
          id: item._id,
          status: item.orderStatus,
          amount: item.totalPrice,
        });
      });
  
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        dispatch(myOrders());
      }, [dispatch, alert, error]);
      
  return (
    <Fragment>
    {loading?(<Loader/>):(<div>
    <div 
    // style={{ height: 300, width: '100%' }}
    className="myOrdersPage"
    >
      <DataGrid rows={rows} columns={columns} autoHeight pageSize={6} disableSelectionOnClick className="myOrdersTable" 
    //   checkboxSelection ->is for check box
        // rowsPerPageOptions={[5]} ->pta nhi kya h
      />
    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
    </div>
    </div>)}
    </Fragment>
  )
}

export default MyOrders