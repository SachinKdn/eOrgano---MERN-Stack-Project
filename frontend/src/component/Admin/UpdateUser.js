import Slider from "./Slider.js";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from 'react-router-dom';
import React, { Fragment,useState, useEffect } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../layout/Loader/loader'
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { UPDATE_USER_RESET, USER_DETAILS_RESET } from "../../constants/userConstants";
import { Button } from "@material-ui/core";
import "./updateUser.css"
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";

const UpdateUser = () => {
const {id} = useParams();
const navigate = useNavigate();
const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
useEffect(() => {
    if (user && user._id !== id) {//otherwise baar baar lete rhega store se 
    // if (user == null) {//oye thoda mne mere hisab se change kiya h kyunki jo phle tha usme ye tha ki same userDetails rhti thi
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    //   dispatch({ type: USER_DETAILS_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, id]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    
    dispatch(updateUser(id, myForm));
  };
  return (
    <Fragment>
      
      <div className="dashboard">
        <Slider />
        <div className="userModificationCenter">
          {loading ? (
            <Loader />
          ) : (
        <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                onSubmit={updateUserSubmitHandler}
              >
                <div className="updateProfileName">
                  <FaUser />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <FaEnvelope />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    readOnly
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="roleSelectDiv">
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
                

                <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
              </form>
            </div>
            )}
      </div>
      </div>
    </Fragment>
  )
}

export default UpdateUser