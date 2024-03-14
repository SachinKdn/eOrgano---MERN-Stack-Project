import React, { Fragment, useEffect } from 'react'
import {CgMouse} from "react-icons/cg"
import "./Home.css"
import Product from "./Product.js"
import Loader from "../layout/Loader/loader"
// import MetaData from '../layout/MetaData'
import { getProduct } from '../../actions/productAction';
import { useSelector,useDispatch } from 'react-redux'
import {useAlert}  from "react-alert"


const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,products} = useSelector((state)=>state.products)
    console.log("first")
    console.log(products)
    useEffect(()=>{
        // alert.show('Oh look, an alert!', { position: positions.BOTTOM_LEFT })
        if(error){
            // alert.show('Oh look, an alert!')
            return alert.error(error);
        }
        dispatch(getProduct());
    },[dispatch,error,alert])
  return (
   <Fragment>
    {loading ? (<Loader />) :(
         <>
         {/* <MetaData title="Sachin"/> */}
     
     
             <div className="banner">
                 <p>Welcome to </p>
                 <h4 >eOrgano</h4>
                 <h1>Find Amazing Products Below</h1>
             <a href="#container1">
                 <button>
                     Scroll <CgMouse/>
                 </button>
             </a>
             </div>
     
             <h2 className="homeHeading" id='container1'>Featured Products</h2>
             {/* <Product product={product} /> */}
             <div id="container">
            
                 {products && products.map((product)=>
                     <Product product={product} />
                 )}
             </div>
         </>
    )}
   </Fragment>
  )
}

export default Home