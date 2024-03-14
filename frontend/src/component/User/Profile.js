import React, { Fragment, useEffect } from 'react'
import "./profile.css"
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";

import Loader from "../layout/Loader/loader";
import {useSelector, useDispatch} from "react-redux"

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { user, loading, isAuthenticated,error } = useSelector((state) => state.user);
    // dispatch(loadUser())
  useEffect(() => {
    if(error){
      navigate("/")
    }
    if (isAuthenticated === false) {
    //   history.push("/login");
        navigate("/login")
    }
  }, [navigate, isAuthenticated,dispatch,error]);
    
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
      <Fragment>
        <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url === "null" ? "./Profile.png" : user.avatar.url} alt={user.name} />

              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
    </Fragment>)}
    </Fragment>
  );
};

export default Profile