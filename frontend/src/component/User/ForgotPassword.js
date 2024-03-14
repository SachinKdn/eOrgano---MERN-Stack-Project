import React, { Fragment, useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { forgotPassword, clearErrors } from "../../actions/userAction"
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { FORGOT_PASSWORD_RESET } from '../../constants/userConstants'
import "./ForgotPassword.css"
import { FaEnvelope } from 'react-icons/fa';
import Loader from '../layout/Loader/loader'

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {isUpdated,error,loading} = useSelector((state) => state.profile)
    const [email, setEmail] = useState("")
    const emailSubmit = (e)=>{
        e.preventDefault();
    
        const myForm = new FormData();
        myForm.set("email", email);
        
        dispatch(forgotPassword(myForm));
    }
    
    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors());

      }
      if(isUpdated){
        alert.error("Reset Token Sent Successfully");
        
    //   dispatch(loadUser());
        navigate('/password/reset')
        dispatch({type:FORGOT_PASSWORD_RESET})
        
      }
    
     
    }, [dispatch,error,isUpdated,loading,alert,navigate])
    
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
    <Fragment>
        <div className="container">
            <div className="box">
                <h1>Forgot Password</h1>
                <form action="submit" className='emailForm' onSubmit={emailSubmit}>
                    <div className="email">
                        <label htmlFor="email">Enter Your Email</label>
                        <div className="inputBox">
                        <FaEnvelope className='LockImg'/>
                        <input type="email" value={email} placeholder='xyz@gmail.com' name='email' required onChange={(e) => setEmail(e.target.value)}/>

                        </div>
                    </div>
                    
                    <input
                  type="submit"
                  value="Send To Email"
                  className="updateProfileBtn"
                />
                </form>
            </div>
        </div>
    </Fragment>
    )}
    </Fragment>
  )
}

export default ForgotPassword