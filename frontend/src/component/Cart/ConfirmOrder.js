import React, { Fragment, useEffect, useState } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { Link,useNavigate } from 'react-router-dom'
import PinDropIcon from "@mui/icons-material/PinDrop";
import "./confirmOrder.css"
import {useSelector, useDispatch} from "react-redux"
import { removeToCart } from "../../actions/cartAction";


const ConfirmOrder = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user}  = useSelector((state)=>state.user)
    const {shippingInfo} = useSelector((state)=>state.cart)
    const { cartItems } = useSelector((state) => state.cart);
    const [subtotal, setSubtotal] = useState(cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      ))
    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;
    const deleteCartItems = (id) =>{
        dispatch(removeToCart(id))
      }
    const placeOrderHandler = () =>{
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
          };
      
          sessionStorage.setItem("orderInfo", JSON.stringify(data));

        navigate("/process/payment" )
        // navigate(0)
      }
    useEffect(() => {
        if(cartItems.length === 0){
            navigate('/cart')
        }
        setSubtotal(cartItems.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
          ))
    }, [cartItems,navigate])
    
  return (
    <Fragment>
        <CheckoutSteps activeStep={1}/>
        <div className="ConfirmContainer">
            <div className="productShippingDetailsBox">
                <div className="shippingDetailsBox">
                    <div className="customerBox">
                        <div>
                            <p className='title'>Your Information</p>
                            <Link to="/account" className='editBtn'>Edit</Link>
                        </div>
                        <p className='normalText'>{user.name}</p>
                        <span className='normalText'>Mobile: {shippingInfo.phoneNo}</span>
                        <span className='normalText'>Email: {user.email}</span>
                    </div>
                    <div className="addressBox">
                        <div>
                            <p className='title'>Shipping Address</p>
                            <Link to="/shipping" className='editBtn'>Edit</Link>
                        </div>
                        <p className='normalText'>{user.name}</p>
                        <div className="pinCode">
                            {/* <PinDropIcon />
                            <span>125033</span> */}
                            <p className='normalText'><PinDropIcon /> {shippingInfo.pinCode}</p>
                        </div>
                        <span className='normalText'>{shippingInfo.address}</span>
                        <span className='normalText'>{shippingInfo.city}, {shippingInfo.state} ({shippingInfo.country})</span>
                    </div>

                </div>
                <div className="productDetailsBox">
                    
                    {cartItems && cartItems.map((item,index)=>(
                        <Fragment>
                            {index > 0 && <div className='separater'><p></p></div>}
                        <div className="productBox">
                        <div>
                            <img src={item.image} alt="img" />
                        </div>
                        <div>
                            <p>{item.name}</p>
                            <span className='normalText'>
                                Description: {item.description}
                            </span>
                            <button onClick={()=>deleteCartItems(item.product)}>Remove</button>
                        </div>
                        <div>
                            <p>{item.quantity} X {item.price} = ₹{item.quantity * item.price} </p>
                        </div>

                    </div>
                            
                            </Fragment>
                    ))}
                    
                </div>
            </div>
            <div className="paymentDetailsBox">
                <div>
                    <p>Price Details</p>
                </div>
                <div>
                    <p>Price (1 item)</p>
                    <p>{`₹${subtotal}`}</p>
                </div>
                <div>
                    <p>Shipping Charges</p>
                    <p>₹{shippingCharges}</p>
                </div>
                <div>
                    <p>Tax</p>
                    <p>₹{tax}</p>
                </div>
                <div className='totalAmountDiv'>
                    <p>Total Amount</p>
                    <p>{`₹${totalPrice}`}</p>
                </div>
                <button onClick={placeOrderHandler}>
                    Place Order
                </button>

            </div>
        </div>
    </Fragment>
  )
}

export default ConfirmOrder