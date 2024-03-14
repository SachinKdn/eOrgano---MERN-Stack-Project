import React, { Fragment, useRef, useState,useEffect } from 'react'
import "./loginSignUp.css"
import Loader from '../layout/Loader/loader'
import {Link} from "react-router-dom"
import { FaUser,FaLock,FaEnvelope } from 'react-icons/fa';
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import {useNavigate} from 'react-router-dom'

const LoginSignUp = () => {
  //ye kaam aaata h jb user login na ho our cart mein pde items ko checkout kre to application phle usko redirect kregi /login pr agar wo login hoga to usko /shipping pr le jayegi otherwise /login pr rkhega but if user checkout k throug /login pr nhi aaya h to usko /account pr direct kregi
  // const redirect = window.location.search ? window.location.search.split("=")[1] : "/account";
  //there is two ways to access location i) using {location} prop but it show some error
  // ii) is window.location --> In a web application, location.search is a property of the window.location object that represents the query string portion of the current URL. The query string is the part of a URL that comes after the question mark (?) and contains key-value pairs separated by ampersands (&). It is commonly used to pass data from one page to another, especially when making GET requests.
  // The location.search property returns the query string portion of the URL, including the leading question mark. If the URL does not contain a query string, location.search will return an empty string ("").
  // console.log(window.location.search)---->?redirect=shipping

  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
    })
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (isAuthenticated) {
        // history.push(redirect);
        navigate('/account',{ replace: true }); //By passing { replace: true } as the second argument to navigate(), we ensure that the current entry in the browser's history is replaced with the new one, effectively replacing the current endpoint.
        // navigate(redirect)
      }
    }, [dispatch, error, alert, isAuthenticated,navigate]);
    const {name,email,password} = user;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png")
    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)
    const loginSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }
    const registerSubmit = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name",name)
        myForm.set("email",email)
        myForm.set("password",password)
        myForm.set("avatar",avatar)
        dispatch(register(myForm));
        // dispatch(register(name, email, password));
    }
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();//to read file from user side
    
          reader.onload = () => {//load hote hee
            if (reader.readyState === 2) {//iski 3 (reader.readyState) states hoti h : 0 1 2 and 0 for initial,  1 for processing, 2 for done
              setAvatarPreview(reader.result);//ye isliye taki agar user ko dekhni ho to
              
              setAvatar(reader.result);//photo upload hote hee dono jgah update hojaye
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);//reader.onload() tbhi call hoga na jb file add hoegi
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };
      
    const switchTabs = (e,tab)=>{
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
          }
          if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
      
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
          }
    }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
    <Fragment>
        <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
                <div>
                    <div className="login_signUp_toggle">
                        <p onClick={(e)=> switchTabs(e,"login")}>LOGIN</p>
                        <p onClick={(e)=> switchTabs(e,"register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form ref={loginTab} onSubmit={loginSubmit} className="loginForm">
                    <div className="loginEmail">
                        {/* <MailOutlineIcon/> */}
                        <FaUser className='FaImg'/>
                        <input type="email" name="" id="" placeholder='Email' required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>
                    </div>
                    <div className="loginPassword">
                    {/* <LockOpenIcon /> */}
                    <FaLock size={20} className='FaImg'/>
                        <input type="password" name="" id="" placeholder='Password' required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
                    </div>
                    <Link to="/password/forgot">
                    Forget Password ?
                    </Link>
                    <input type="submit" value="Login" className='loginBtn'/>
                </form>
                <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  {/* <FaceIcon /> */}
                  <FaUser className='FaImg'/>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  {/* <MailOutlineIcon /> */}
                  <FaEnvelope className='FaImg'/>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  {/* <LockOpenIcon /> */}
                  <FaLock size={20} className='FaImg'/>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
                
            </div>
        </div>
    </Fragment>
      )}
    </Fragment>
  )
}

export default LoginSignUp