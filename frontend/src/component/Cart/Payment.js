import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import {useNavigate} from "react-router-dom"
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/loader";
    
const Payment = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  // const [loading, setLoading] = useState(null)
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  const order = {
    shippingInfo,
    orderItems: cartItems,//ye jo h na isme vhi saare order honge jo cart mein thy
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
    const payBtn = useRef(null)
    
//     const submitHandler = async (e) =>{
//         e.preventDefault()
//         payBtn.current.disabled = true;
        

//     try {
//       setLoading(true);
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const { data } = await axios.post(
//         "/api/v1/payment/process",
//         paymentData,
//         config
//       );

//       const client_secret = data.client_secret;

//       if (!stripe || !elements) return;
// //************************************************************************************* */
//       const cardElement = elements.getElement(CardNumberElement);

//       const { paymentMethod, error } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: cardElement,
//       });

      


//       const result = await stripe.confirmCardPayment(client_secret, {
//         payment_method: {
//           card: paymentMethod.card,
//           // card: elements.getElement(CardNumberElement),
//         //   billing_details: {
//         //     name: user.name,
//         //     email: user.email,
//         //     address: {
//         //       line1: shippingInfo.address,
//         //       city: shippingInfo.city,
//         //       state: shippingInfo.state,
//         //       postal_code: shippingInfo.pinCode,
//         //       country: shippingInfo.country,
//         //     },
//         //   },
//         },
//       });

//       if (result.error) {
//         // payBtn.current.disabled = false;

//         console.log(result.error.message)
//         alert.error(result.error.message);
//       } else {
//         if (result.paymentIntent.status === "succeeded") {
          
//           order.paymentInfo = {
//             id: result.paymentIntent.id,
//             status: result.paymentIntent.status,
//           };

//           dispatch(createOrder(order));
//           navigate("/success", {replace:true})
//           // history.push("/success");
//         } else {
//           alert.error("There's some issue while processing payment ");
//         }
//       }
//     } catch (error) {
//       // payBtn.current.disabled = false;
//       console.log(error.message)
//       alert.error(error.message);
//     }finally{
      
//       setLoading(false)
//     }
//     }
const submitHandler = async (e) => {
  e.preventDefault();

  payBtn.current.disabled = true;

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    const { data } = await axios.post(
      "/api/v1/payment/process",
      paymentData,
      config
    );

    const client_secret = data.client_secret;

    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: user.name,
          email: user.email,
          address: {
            line1: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            postal_code: shippingInfo.pinCode,
            country: shippingInfo.country,
          },
        },
      },
    });

    if (result.error) {
      payBtn.current.disabled = false;

      alert.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };

        dispatch(createOrder(order));
        navigate("/success", {replace:true})
        // history.push("/success");
      } else {
        alert.error("There's some issue while processing payment ");
      }
    }
  } catch (error) {
    payBtn.current.disabled = false;
    alert.error(error.response.data.message);
  }
};
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
    }, [dispatch, error, alert]);
  
  return (
    <Fragment>
      {false?(<div><Loader/></div>):(
    
    <Fragment>
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
        </div>
    </Fragment>
    )}
    </Fragment>
  )
}

export default Payment