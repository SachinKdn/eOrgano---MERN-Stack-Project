import React, { Fragment, useState } from 'react'
// import Backdrop from "@material-ui/core/Backdrop"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
// import SpeedDialIcon from '@mui/material/SpeedDialIcon';
// import DashboardIcon from "@material-ui/icons/Dashboard";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from "@mui/icons-material/Person";
// import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
// import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {logout} from "../../../actions/userAction"
import {useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import "./Header.css"
const UserOptions = ({user}) => {
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state)=>state.cart)
  const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        // <ShoppingCartIcon
        //   style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        // />
        <div className="box1">

          {cartItems.length === 0 ? "" : 
          (<span>{cartItems.length}</span>)
        }
          <ShoppingCartIcon //icon ka color chnge kb ho
        style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
      />
      </div>
      ),
      name: "Cart",
      // name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate('/admin/dashboard')
    // history.push("/admin/dashboard");
  }

  function orders() {
    
    navigate('/orders')
    // history.push("/orders");
  }
  function account() {
    navigate('/account')
    // history.push("/account");
  }
  function cart() {
    navigate('/cart')
    // history.push("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    // alert.error(error);
    // alert.success("Logout Successfully");
    navigate('/')
  }

  return (

    <Fragment>
        {/* <Backdrop sx={{ color: '#c5c5c5'}} open={open} 
  style={{ zIndex: "10", backgroundColor: "rgba(0, 0, 0, 0.2)" }}/> */}
        <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        direction="down"
        className="speedDial"
            icon={
                <img className='speedDialIcon'  src={user.avatar.url === "null" ? "/Profile.png" : user.avatar.url } alt='Pro'/>
            }
        open={open}>
            {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}//ye bta rha h ki agar user phone se h to tooltip(hints) sabhi dikhe SpeedDial pr click hote hee...
          />
        ))}
      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions