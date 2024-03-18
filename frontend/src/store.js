// first step redux - isme redux store bnega
import {createStore,combineReducers,applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"; //to connect with extension
import { allReviewReducer, newReviewReducer, productDetailsReducer, productReducer } from "./reducers/productReducer";
import {  profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer";


const reducer = combineReducers({
products : productReducer,
productDetails : productDetailsReducer,
user: userReducer,
profile: profileReducer,
cart:cartReducer,
newOrder:newOrderReducer,
myOrders:myOrdersReducer,
orderDetails: orderDetailsReducer,
newReview: newReviewReducer,
allReviews:allReviewReducer,

});

let  initialState = {
    // initial state of cart reducer
    cart:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
        shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{},
    },
    orderDetails:{
        loading:true
    }
};

const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;

// second step redux is add <provider> in Index.js

