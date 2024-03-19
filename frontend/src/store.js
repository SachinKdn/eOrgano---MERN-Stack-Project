// first step redux - isme redux store bnega
import {createStore,combineReducers,applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"; //to connect with extension
import { allReviewReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReducerAdmin, reviewReducer } from "./reducers/productReducer";
import {  allUsersReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";


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
newProduct:newProductReducer,
product:productReducerAdmin,
allOrders: allOrdersReducer,
order: orderReducer,
allUsers: allUsersReducer,
userDetails: userDetailsReducer,
review:reviewReducer,
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

