import {ADD_TO_CART, REMOVE_TO_CART, SAVE_SHIPPING_INFO} from "../constants/cartConstants"

export const cartReducer =
    (state = { cartItems:[],shippingInfo:{} },action) => {
        switch (action.type) {

            case ADD_TO_CART:
                const item = action.payload;

                // Remember:---
                // Yhan .product contains the product._id

                const isItemExist = state.cartItems.find((i)=>i.product === item.product)
                // agar item phle se hoga to ye find() method uss item ko return krega
                if(isItemExist){
                    // replace prev with newer one
                    return {
                        ...state,
                        cartItems:state.cartItems.map((i)=>i.product === isItemExist.product ? item : i)
                    }
                }else{
                    return{
                        ...state,
                        cartItems:[...state.cartItems,item]//new one added
                    }
                }
            
                case REMOVE_TO_CART:
                    return{
                        ...state,
                        cartItems:state.cartItems.filter((i)=>i.product !== action.payload)
                        
                    };
                case SAVE_SHIPPING_INFO:
                    return{
                        ...state,
                        shippingInfo: action.payload
                    }
            default:
                return state;
        }
    }
