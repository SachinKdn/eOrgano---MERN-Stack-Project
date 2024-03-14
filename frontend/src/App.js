import './App.css';
import Header from './component/layout/Header/Header.js'
import {BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom"
import axios from "axios";
import React
 ,{ useState }
  from 'react';
import WebFont from "webfontloader"
import Footer from "./component/layout/Footer/Footer.js"
import Loader from "./component/layout/Loader/loader"
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from "./component/User/LoginSignUp"
import Profile from "./component/User/Profile.js"
import UpdatePassword from "./component/User/UpdatePassword.js"
import "@fontsource/lexend"; // Defaults to weight 400
import "@fontsource/lexend/400.css"; // Specify weight
// import "@fontsource/lexend/400-italic.css"; // Specify weight and style
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import UpdateProfile from "./component/User/UpdateProfile.js"
import ForgotPassword from "./component/User/ForgotPassword.js"
import CheckMail from "./component/User/CheckMail.js"
import CreatePassword from "./component/User/CreatePassword.js"
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import Payment from "./component/Cart/Payment.js"
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";

function App() {
  const {isAuthenticated, user} = useSelector((state)=>state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");
  console.log(stripeApiKey)
  const getStripe = async function getStripeApiKey() {
    // const {data}= fetch("/api/v1/stripeapikey")
  //   fetch('http://localhost:3000/api/v1/stripeapikey')
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error(error));
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
    console.log(stripeApiKey)
  }


  React.useEffect(()=>{//it loads the fonts before the pages being loaded

    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"],
        
      }
    })

    store.dispatch(loadUser());
    getStripe();
  },[]);

  // ProtectedRoute component to wrap around your protected components
function ProtectedRoute({ children }) {
  return isAuthenticated === true ? children : <Navigate to="/login" replace /> ;
}
  return (
      <Router> 
        <Header />
        {isAuthenticated && <UserOptions user={user}/>}
        <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path="/product/:id" element={<ProductDetails/>}/>
        <Route exact path="/products" element={<Products/>}/>
        <Route exact path="/products/:keyword" element={<Products/>}/>
        <Route exact path="/search" element={<Search/>}/>
        <Route exact path="/login" element={<LoginSignUp/>}/>
        <Route exact path="/password/update" element={<UpdatePassword/>}/>
        <Route exact path="/password/forgot" element={<ForgotPassword/>}/>
        <Route path="/password/reset" element={<CheckMail/>}/>
        <Route path="/password/reset/:token" element={<CreatePassword/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order/:id" element={<OrderDetails/>}/>
        

      {stripeApiKey && (
          <Route
          path="/process/payment"
          element={
            <ProtectedRoute>
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        )}
        <Route 
        path="/success"
        element={
          <ProtectedRoute>
            <OrderSuccess /> {/* Your protected component here */}
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/orders"
        element={
          <ProtectedRoute>
            <MyOrders /> {/* Your protected component here */}
          </ProtectedRoute>
        } 
      />
      
        <Route 
        path="/account"
        element={
          <ProtectedRoute>
            <Profile /> {/* Your protected component here */}
          </ProtectedRoute>
        } 
      />

        <Route 
        path="/me/update"
        element={
          <ProtectedRoute>
            <UpdateProfile /> {/* Your protected component here */}
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/shipping"
        element={
          <ProtectedRoute>
            <Shipping /> {/* Your protected component here */}
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/order/confirm"
        element={
          <ProtectedRoute>
            <ConfirmOrder /> {/* Your protected component here */}
          </ProtectedRoute>
        } 
      />

      {/* ProtectedRoute is a component that takes in children (the component you want to protect) and checks if the user is authenticated. If the user is not authenticated, it redirects to the login page.
For any protected route, you wrap the component in the ProtectedRoute component using the element prop.
The replace prop in <Navigate to="/login" replace /> is used to replace the current entry in the history stack, meaning the user won't be able to go back to the protected route using the browser's back button after being redirected to the login page. */}
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;
