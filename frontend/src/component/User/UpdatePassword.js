import React, { Fragment, useEffect, useState } from 'react'
import "./updatePassword.css"
import LockIcon from '@mui/icons-material/Lock'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import Loader from "../layout/Loader/loader"
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
    clearErrors,
    loadUser,
    updatePassword
  } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const updatePasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
        myForm.set("password", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        
        dispatch(updatePassword(myForm));
      };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }
      if(isUpdated){
        alert.error("Password Updated Successfully");
        
      dispatch(loadUser());
        navigate('/account')
        dispatch({type:UPDATE_PASSWORD_RESET})
        
      }
    }, [dispatch,error,isUpdated,navigate,alert])
    
  return (
    <Fragment>
      {loading?(<Loader/>):(
    <Fragment>
        <div className="container">
            <div className="box">
                <h1>Update Password</h1>
                <form action="submit" className='passwordForm' onSubmit={updatePasswordSubmit}>
                    <div className="password">
                        <label htmlFor="oldPassword">Enter Old Password</label>
                        <div className="inputBox">
                        <VpnKeyIcon className='LockImg'/>
                        <input type="password" value={oldPassword} placeholder='Old Password' name='oldPassword' required onChange={(e) => setOldPassword(e.target.value)}/>

                        </div>
                    </div>
                    <div className="password">
                        <label htmlFor="newPassword">New Password</label>
                        <div className="inputBox">
                        <LockOpenIcon className='LockImg'/>
                        <input type="password" value={newPassword} placeholder='New Password' name='newPassword' required onChange={(e) => setNewPassword(e.target.value)}/>
                    
                        </div></div>
                    <div className="password">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="inputBox">
                        <LockIcon className='LockImg'/>
                        <input type="password" value={confirmPassword} placeholder='Confirm New Password' name='confirmPassword' required onChange={(e) => setConfirmPassword(e.target.value)}/>
                    
                        </div></div>

                    <input
                  type="submit"
                  value="Change"
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

export default UpdatePassword