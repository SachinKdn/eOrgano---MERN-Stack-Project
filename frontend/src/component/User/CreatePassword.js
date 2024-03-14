import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/loader"
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
    clearErrors,
    loadUser,
    resetPassword
  } from "../../actions/userAction";
import { RESET_PASSWORD_RESET } from '../../constants/userConstants';
import "./createPassword.css"

const CreatePassword = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    let { token } = useParams();
    const {isAuthenticated} = useSelector((state)=>state.user)
    
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const updatePasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        
        dispatch(resetPassword(token,myForm));
      };

      useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }
          if(isAuthenticated){
            navigate("/")
        }
      if(isUpdated){
        alert.error("Password Updated Successfully");
        
      dispatch(loadUser());
        navigate('/')
        dispatch({type:RESET_PASSWORD_RESET})
        
      }
    }, [dispatch,error,isUpdated,navigate,alert,isAuthenticated])
    

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
    <Fragment>
      <div className="container">
        <div className="box">
          
        <h1>Create Password</h1>
        <form action="submit" className='passwordForm' onSubmit={updatePasswordSubmit}>
                    
                    <div className="password">
                        <label htmlFor="newPassword">New Password</label>
                        <div className="inputBox">
                        <LockOpenIcon className='LockImg'/>
                        <input type="password" value={password} placeholder='New Password' name='newPassword' required onChange={(e) => setPassword(e.target.value)}/>
                    
                        </div></div>
                    <div className="password">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="inputBox">
                        <LockIcon className='LockImg'/>
                        <input type="password" value={confirmPassword} placeholder='Confirm New Password' name='confirmPassword' required onChange={(e) => setConfirmPassword(e.target.value)}/>
                    
                        </div></div>

                    <input
                  type="submit"
                  value="Save Password"
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

export default CreatePassword