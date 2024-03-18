import React from 'react'
import profilePng from "../../images/Profile.png"
import "./reviewCard.css"
import { Rating } from '@mui/material'
const ReviewCard = ({review}) => {
    const options = {
      readOnly:true,
      value: review.rating,
      precision:0.5,
      size:"medium"
      }
  return (
    <div className='revierwCard'>
        <div className="reviewerHeader">
        <img src={profilePng} alt="User" />
        <div>
        <p>{review.name}</p>
        <Rating {...options}/></div>
        </div>
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard