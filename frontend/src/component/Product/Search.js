import React, { Fragment, useState } from 'react'
import "./search.css"
import {useNavigate} from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate();
    const [keyword,setKeyword] = useState("");
    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
            // history.push(`/products/${keyword}`)
        }else{
            // history.push("/products")
            navigate('/products')
            // navigate(-1)
        }

    }
  return (
    <Fragment >

    <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input type="text" autoFocus placeholder='Search A Product...' onChange={(e)=> setKeyword(e.target.value)} />
        <input type="submit" value="Search" />
    </form>
    </Fragment>
  )
}

export default Search