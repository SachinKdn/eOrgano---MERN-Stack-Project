import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Slider from "./Slider";
import {
    getOrderDetails,
    clearErrors,
    updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";
import PinDropIcon from "@mui/icons-material/PinDrop";

const ProcessOrder = () => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);
        console.log(status)
        dispatch(updateOrder(id, myForm));
    };

    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Order Updated Successfully");
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, isUpdated, updateError]);

    return (
        <Fragment>
            <div className="dashboard">
                <Slider />
                <div className="processOrderContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        // <div
                        //   className="confirmOrderPage"
                        //   style={{
                        //     display: order.orderStatus === "Delivered" ? "block" : "grid",
                        //   }}
                        // >
                        //   <div>
                        //     <div className="confirmshippingArea">
                        //       <Typography>Shipping Info</Typography>
                        //       <div className="orderDetailsContainerBox">
                        //         <div>
                        //           <p>Name:</p>
                        //           <span>{order.user && order.user.name}</span>
                        //         </div>
                        //         <div>
                        //           <p>Phone:</p>
                        //           <span>
                        //             {order.shippingInfo && order.shippingInfo.phoneNo}
                        //           </span>
                        //         </div>
                        //         <div>
                        //           <p>Address:</p>
                        //           <span>
                        //             {order.shippingInfo &&
                        //               `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        //           </span>
                        //         </div>
                        //       </div>

                        //       <Typography>Payment</Typography>
                        //       <div className="orderDetailsContainerBox">
                        //         <div>
                        //           <p
                        //             className={
                        //               order.paymentInfo &&
                        //               order.paymentInfo.status === "succeeded"
                        //                 ? "greenColor"
                        //                 : "redColor"
                        //             }
                        //           >
                        //             {order.paymentInfo &&
                        //             order.paymentInfo.status === "succeeded"
                        //               ? "PAID"
                        //               : "NOT PAID"}
                        //           </p>
                        //         </div>

                        //         <div>
                        //           <p>Amount:</p>
                        //           <span>{order.totalPrice && order.totalPrice}</span>
                        //         </div>
                        //       </div>

                            //   <Typography>Order Status</Typography>
                            //   <div className="orderDetailsContainerBox">
                            //     <div>
                            //       <p
                            //         className={
                            //           order.orderStatus && order.orderStatus === "Delivered"
                            //             ? "greenColor"
                            //             : "redColor"
                            //         }
                            //       >
                            //         {order.orderStatus && order.orderStatus}
                            //       </p>
                            //     </div>
                            //   </div>
                        //     </div>
                        //     <div className="confirmCartItems">
                        //       <Typography>Your Cart Items:</Typography>
                        //       <div className="confirmCartItemsContainer">
                        //         {order.orderItems &&
                        //           order.orderItems.map((item) => (
                        //             <div key={item.product}>
                        //               <img src={item.image} alt="Product" />
                        //               <Link to={`/product/${item.product}`}>
                        //                 {item.name}
                        //               </Link>{" "}
                        //               <span>
                        //                 {item.quantity} X ₹{item.price} ={" "}
                        //                 <b>₹{item.price * item.quantity}</b>
                        //               </span>
                        //             </div>
                        //           ))}
                        //       </div>
                        //     </div>
                        //   </div>
                        //   {/*  */}
                        //   <div
                        //     style={{
                        //       display: order.orderStatus === "Delivered" ? "none" : "block",
                        //     }}
                        //   >
                        // <form
                        //   className="updateOrderForm"
                        //   onSubmit={updateOrderSubmitHandler}
                        // >
                        //   <h1>Process Order</h1>

                        //   <div>
                        //     <AccountTreeIcon />
                        //     <select onChange={(e) => setStatus(e.target.value)}>
                        //       <option value="">Choose Category</option>
                        //       {order.orderStatus === "Processing" && (
                        //         <option value="Shipped">Shipped</option>
                        //       )}

                        //       {order.orderStatus === "Shipped" && (
                        //         <option value="Delivered">Delivered</option>
                        //       )}
                        //     </select>
                        //   </div>

                        //   <Button
                        //     id="createProductBtn"
                        //     type="submit"
                        //     disabled={
                        //       loading ? true : false || status === "" ? true : false
                        //     }
                        //   >
                        //     Process
                        //   </Button>
                        // </form>
                        //   </div>
                        // </div>
                        <div className="processOrderShippingBox">
                            <div className="processOrderMetaData">
                                <div className="customerBox">
                                    <div>
                                        <div>
                                            <p className='title'>Customer Information</p>
                                        </div>
                                        <p className='normalText'>{order.user.name}</p>
                                        <span className='normalText'>Mobile: {order.shippingInfo.phoneNo}</span>
                                        <span className='normalText'>Email: {order.user.email}</span>
                                    </div>
                                    <div>
                                        <div>
                                            <p className='title'>Shipping Address</p>
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
                                <div className="addressBox" style={{
                                    display: order.orderStatus === "Delivered" ? "none" : "block",
                                }}>
                                    <div>
                                    <form
                                        className="updateOrderForm"
                                        onSubmit={updateOrderSubmitHandler}
                                    >
                                        <h1 style={{fontSize:"1.8vmax",fontFamily:"Lexend"}}>Process Order</h1>

                                        <div>
                                            <AccountTreeIcon />
                                            <select onChange={(e) => setStatus(e.target.value)}>
                                                <option value="">Choose Category</option>
                                                {order.orderStatus === "Processing" && (
                                                    <option value="Shipped">Shipped</option>
                                                )}

                                                {order.orderStatus === "Shipped" && (
                                                    <option value="Delivered">Delivered</option>
                                                )}
                                            </select>
                                        </div>

                                        <Button
                                            id="createProductBtn"
                                            type="submit"
                                            disabled={
                                                loading ? true : false || status === "" ? true : false
                                            }
                                        >
                                            Process
                                        </Button>
                                    </form></div>
                                    <div style={{padding:"0 2vmax"}}><Typography style={{fontSize:"1.5vmax",fontFamily:"Lexend"}}>Order Status</Typography>
                              <div className="orderDetailsContainerBox">
                                <div>
                                  <p style={{fontSize:"1vmax",fontFamily:"Roboto"}}
                                    className={
                                      order.orderStatus && order.orderStatus === "Shipped"
                                        ? "greenColor"
                                        : "redColor"
                                    }
                                  >
                                    {order.orderStatus && order.orderStatus}
                                  </p>
                                </div>
                              </div></div>
                                </div>


                            </div>
                            <div className="productDetailsBox">

                                {order.orderItems && order.orderItems.map((item, index) => (
                                    <Fragment>
                                        {index > 0 && <div className='separater'><p></p></div>}
                                        <div className="productBox">
                                            <div>
                                                <img src={item.image} alt="img" />
                                            </div>
                                            <div>
                                                <span style={{ color: "Tomato", fontSize: "1vmax", fontWeight: 500 }}>#{item._id}</span>
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

                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;