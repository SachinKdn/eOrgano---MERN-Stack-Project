import React from 'react'
import ReactStars from "react-rating-stars-component"
import profilePng from "../../images/Profile.png"
import "./reviewCard.css"
const ReviewCard = ({review}) => {
    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor : "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value : review.rating,
        isHalf : true,
      }
  return (
    <div className='revierwCard'>
        <div className="reviewerHeader">
        <img src={profilePng} alt="User" />
        <div>
        <p>{review.name}</p>
        <ReactStars {...options}/></div>
        </div>
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard