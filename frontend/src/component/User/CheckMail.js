import React, { Fragment, useEffect } from 'react'
import Loader from "../layout/Loader/loader"
import { useNavigate } from 'react-router-dom'
import "./checkMail.css"
import { useSelector } from 'react-redux'
const CheckMail = () => {
    const navigate = useNavigate();
    const {isAuthenticated,loading} = useSelector((state)=>state.user)
    useEffect(() => {
        
        if(isAuthenticated){
            navigate("/")
        }
    }, [isAuthenticated,navigate])
    
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
    <Fragment>
        <div className="container">
            <div className="box">

            <h2 >Password Reset Email Sent</h2>
            {/* <div className="data">

            <p>to</p>
            <a href="">sklovelyjatt2018@gmail.com</a>
            </div> */}
            <div className="info">

                <p >We have sent a password reset email to the email address you provided. Please check your inbox (and spam folder) for an email from us.</p>
            </div>
            <span>Follow the instructions in the email to reset your password. If you didn't receive the email, please try again.</span>
  


            </div>
        </div>
    </Fragment>
    )}
    </Fragment>
  )
}

export default CheckMail