import React, { Fragment } from 'react'
import "./cart.css"
import CartItemCard from "./CartItemCard.js"
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart,removeToCart } from "../../actions/cartAction";
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
          return;
        }
        dispatch(addItemsToCart(id, newQty));
      };
    
      const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
          return;
        }
        dispatch(addItemsToCart(id, newQty));
      };
      const deleteCartItems = (id) =>{
        dispatch(removeToCart(id))
      }
      const checkOutHandler = () =>{
        if(isAuthenticated){
          navigate('/shipping')
        }else{
          navigate('/login')
        }
        // navigate('/login?redirect=/shipping') //ye kh rha h ki login pr chle jao or saath mein ye query parameter bhi le jao agge ka kaam LoginSignUp dekhega
      }
  return (
    <Fragment>

    {cartItems.length === 0 ? (
      <div className="emptyCart">
        <img src="./Cart.png" alt="emptyCart" />
        <p>Hey, it feels so light!</p>
        <span>There is nothing in your cart. Let's add some items.</span>
        
        <Link to="/products">ADD ITEMS TO CART</Link>
      </div>
    ) :(
      <Fragment>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>

        {cartItems &&
          cartItems.map((item) => (
            <div className="cartContainer" key={item.product}>
              <CartItemCard item={item} deleteCartItems={deleteCartItems} />
              <div className="cartInput">
                <button
                  onClick={() =>
                    decreaseQuantity(item.product, item.quantity)
                  }
                >
                  -
                </button>
                <input type="number" value={item.quantity} readOnly />
                <button
                  onClick={() =>
                    increaseQuantity(
                      item.product,
                      item.quantity,
                      item.stock
                    )
                  }
                >
                  +
                </button>
              </div>
              <p className="cartSubtotal">{`₹${
                item.price * item.quantity
              }`}</p>
              
            </div>
            
          ))}
        <div className="cartGrossProfit">
          <div></div>
          <div className="cartGrossProfitBox">
            <p>Gross Total</p>
            <p>{`₹${cartItems.reduce(
              (acc, item) => acc + item.quantity * item.price,
              0
            )}`}</p>
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button onClick={checkOutHandler}>Check Out</button>
          </div>
        </div>
        
      </div>
    </Fragment>
      )}
      </Fragment>
  )
}

export default Cart