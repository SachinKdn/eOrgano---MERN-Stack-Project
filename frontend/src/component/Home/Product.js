import React from 'react'
import {Link} from "react-router-dom"
import "./Home.css"
import { Rating } from '@mui/material'
const Product = ({product}) => {
  const options = {
    readOnly:true,
    value: product.ratings,
    precision:0.5,
    size:"medium"
    // size: window.innerWidth < 600 ? "medium" : "large",
  }
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
        <div><Rating {...options} />
        <span className='productCard-div-span'>({product.numOfReviews} Reviews)</span>
        </div>
        <span>{`₹${product.price}`}</span>
    </Link>
  )
}

export default Product