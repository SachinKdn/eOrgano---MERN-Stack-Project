// import React, { Fragment, useEffect } from "react";
// import "./orderDetails.css";
// import { useSelector, useDispatch } from "react-redux";
// // import MetaData from "../layout/MetaData";
// import { Link } from "react-router-dom";
// // import { Typography } from "@material-ui/core";
// import { getOrderDetails, clearErrors } from "../../actions/orderAction";
// import Loader from "../layout/Loader/loader";
// import { useAlert } from "react-alert";
// import { useParams } from "react-router-dom";
// import PinDropIcon from "@mui/icons-material/PinDrop";


// const OrderDetails = () => {
//     console.log("wlcm to orderDetails")
//   const { order, error, loading } = useSelector((state) => state.orderDetails);

//   const dispatch = useDispatch();
//   const alert = useAlert();

//   let { id } = useParams();
  
//   useEffect(() => {
//       console.log("useEffect called")
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//     dispatch(getOrderDetails(id));
//   }, [dispatch, alert, error, id]);
  
//   return (
    // <Fragment>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    // <Fragment>
    //      <div className="ConfirmContainer">
    //         <div className="productShippingDetailsBox">
    //             <div className="shippingDetailsBox">
    //                 <div className="customerBox">
    //                     <div>
    //                         <p className='title'>Your Information</p>
    //                         <Link to="/account" className='editBtn'>Edit</Link>
    //                     </div>
    //                     <p className='normalText'>{order.user.name}</p>
    //                     <span className='normalText'>Mobile: {order.shippingInfo.phoneNo}</span>
    //                     <span className='normalText'>Email: {order.user.email}</span>
    //                 </div>
    //                 <div className="addressBox">
    //                     <div>
    //                         <p className='title'>Shipping Address</p>
    //                         <Link to="/shipping" className='editBtn'>Edit</Link>
    //                     </div>
    //                     <p className='normalText'>{order.user.name}</p>
    //                     <div className="pinCode">
    //                         {/* <PinDropIcon />
    //                         <span>125033</span> */}
    //                         <p className='normalText'><PinDropIcon /> {order.shippingInfo.pinCode}</p>
    //                     </div>
    //                     <span className='normalText'>{order.shippingInfo.address}</span>
    //                     <span className='normalText'>{order.shippingInfo.city}, {order.shippingInfo.state} ({order.shippingInfo.country})</span>
    //                 </div>
    //                 <div className="paymentDetailsBox">
    //                     <div>
    //                         <p>Price Details</p>
    //                     </div>
    //                     <div>
    //                         <p>Price </p>
    //                         <p>{`₹${order.itemsPrice}`}</p>
    //                     </div>
    //                     <div>
    //                         <p>Shipping Charges</p>
    //                         <p>₹{order.shippingPrice}</p>
    //                     </div>
    //                     <div>
    //                         <p>Tax</p>
    //                         <p>₹{order.taxPrice}</p>
    //                     </div>
    //                     <div className='totalAmountDiv'>
    //                         <p>Total Amount</p>
    //                         <p>{`₹${order.totalPrice}`}</p>
    //                     </div>
    //                     <button >
    //                         {order.paymentInfo.status}
    //                     </button>

    //                 </div>

    //             </div>
    //             <div className="productDetailsBox">
                    
    //                 {order.orderItems && order.orderItems.map((item,index)=>(
    //                     <Fragment>
    //                         {index > 0 && <div className='separater'><p></p></div>}
    //                     <div className="productBox">
    //                     <div>
    //                         <img src={item.image} alt="img" />
    //                     </div>
    //                     <div>
    //                         <p>{item.name}</p>
    //                         <span className='normalText'>
    //                             Description: {item.description}
    //                         </span>
    //                     </div>
    //                     <div>
    //                         <p>{item.quantity} X {item.price} = ₹{item.quantity * item.price} </p>
    //                     </div>

    //                 </div>
                            
    //                         </Fragment>
    //                 ))}
                    
    //             </div>
    //         </div>
            
    //     </div>
    // </Fragment>
    //   )}
    // </Fragment>
//   )
// }

// export default OrderDetails

import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/loader";
import { useAlert } from "react-alert";
import PinDropIcon from "@mui/icons-material/PinDrop";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();
    const {id} = useParams();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
  <Fragment>
       <div className="ConfirmContainer">
       <div className="productShippingDetailsBox">
              <div className="shippingDetailsBox">
                  <div className="customerBox">
                      <div>
                          <p className='title'>Your Information</p>
                          <Link to="/account" className='editBtn'>Edit</Link>
                      </div>
                      <p className='normalText'>{order.user.name}</p>
                      <span className='normalText'>Mobile: {order.shippingInfo.phoneNo}</span>
                      <span className='normalText'>Email: {order.user.email}</span>
                  </div>
                  <div className="addressBox">
                      <div>
                          <p className='title'>Shipping Address</p>
                          <Link to="/shipping" className='editBtn'>Edit</Link>
                      </div>
                      <p className='normalText'>{order.user.name}</p>
                      <div className="pinCode">
                          {/* <PinDropIcon />
                          <span>125033</span> */}
                          <p className='normalText'><PinDropIcon /> {order.shippingInfo.pinCode}</p>
                      </div>
                      <span className='normalText'>{order.shippingInfo.address}</span>
                      <span className='normalText'>{order.shippingInfo.city}, {order.shippingInfo.state} ({order.shippingInfo.country})</span>
                  </div>
                  <div className="paymentDetailsBox">
                      <div>
                          <p>Price Details</p>
                      </div>
                      <div>
                          <p>Price </p>
                          <p>{`₹${order.itemsPrice}`}</p>
                      </div>
                      <div>
                          <p>Shipping Charges</p>
                          <p>₹{order.shippingPrice}</p>
                      </div>
                      <div>
                          <p>Tax</p>
                          <p>₹{order.taxPrice}</p>
                      </div>
                      <div className='totalAmountDiv'>
                          <p>Total Amount</p>
                          <p>{`₹${order.totalPrice}`}</p>
                      </div>
                      <button >
                          Payment {order.paymentInfo.status}
                      </button>

                  </div>

              </div>
              <div className="productDetailsBox">
                  
                  {order.orderItems && order.orderItems.map((item,index)=>(
                      <Fragment>
                          {index > 0 && <div className='separater'><p></p></div>}
                      <div className="productBox">
                      <div>
                          <img src={item.image} alt="img" />
                      </div>
                      <div>
                        <span style={{color:"Tomato", fontSize:"1vmax", fontWeight:500}}>#{item._id}</span>
                          <p>{item.name}</p>
                          <span className='normalText'>
                              Description: {item.description}
                          </span>
                      </div>
                      <div>
                          <p>{item.quantity} X {item.price} = ₹{item.quantity * item.price} </p>
                          <p >{order.orderStatus}</p>
                      </div>

                  </div>
                          
                          </Fragment>
                  ))}
                  
              </div>
          </div>
          
      </div>
  </Fragment>
    )}
  </Fragment>
  );
};

export default OrderDetails