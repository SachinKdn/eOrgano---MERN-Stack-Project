import {ADD_TO_CART,REMOVE_TO_CART, SAVE_SHIPPING_INFO} from "../constants/cartConstants"
import axios from "axios";

export const addItemsToCart = (id,quantity) => async (dispatch,getState)=>{
    
        const {data} = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type:ADD_TO_CART,
            payload: {
                product:data.product._id,
                name:data.product.name,
                price:data.product.price,
                image:data.product.images[0].url,
                stock:data.product.stock,
                description:data.product.description,
                quantity
            },
        })

        // reciew it as parameter first
        // getState() method is used to get all the redux state present in application at that time 
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
    

  }

  export const removeToCart = (id) => async (dispatch,getState)=>{
    
    dispatch({
        type:REMOVE_TO_CART,
        payload: id
    })


    // getState() method is used to get all the redux state present in application at that time 
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))


}

export const saveShippingInfo = (data) => async (dispatch)=>{
    
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload: data
    })


    // getState() method is used to get all the redux state present in application at that time 
    localStorage.setItem("shippingInfo",JSON.stringify(data))


}
