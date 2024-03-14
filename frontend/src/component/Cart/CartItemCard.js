import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import "./cartItemCard.css"

const CartItemCard = ({item,deleteCartItems}) => {
  return (
    <Fragment>
        {/* <div className="container">
            <img src={item.image} alt="img" />
            <div className="details">
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price: ₹${item.price}`}</span>
                <p>Remove</p>
            </div>
        </div> */}
        <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
    </Fragment>
  )
}

export default CartItemCard