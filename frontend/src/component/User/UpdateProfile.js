import React, { Fragment,useState, useEffect } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../layout/Loader/loader'
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import {
  clearErrors,
  updateProfile,
  loadUser
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import "./updateProfile.css"
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();
  const { user } = useSelector(
    (state) => state.user
  );
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  
  
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    if(avatar){
      myForm.set("avatar", avatar);
    }
    
    dispatch(updateProfile(myForm));
  };
  

   const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      // setAvatarPreview(user.avatar.url === "null" ? "./Profile.png" : user.avatar.url);
      if(user.avatar.url === "null"){

        setAvatarPreview("/Profile.png");
      }else{

        setAvatarPreview(user.avatar.url);
      }
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.error("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account");
// taki isUpdated ko wapis se false kr ske
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
    <Fragment>
      <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  {/* <img src={avatarPreview === "null" ? "./Profile.png" : avatarPreview} alt={user.name} /> */}
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
    </Fragment>
     )}
     </Fragment>
  );
};

export default UpdateProfile;
