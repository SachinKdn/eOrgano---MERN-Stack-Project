import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,CLEAR_ERRORS,REGISTER_FAIL,REGISTER_REQUEST,REGISTER_SUCCESS, LOAD_USER_SUCCESS, LOAD_USER_REQUEST, LOAD_USER_FAIL,LOGOUT_SUCCESS,LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  } from "../constants/userConstants";
  import axios from "axios";
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(
        `/api/v1/login`,
        { email, password },
        config
      );
  
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ 
        type: LOGIN_FAIL, 
        payload:error.response.data.error,
        // payload: error.response.data.message 
      });
    }
  };
  export const register = (userData) => async (dispatch) => {
    try {
      // for (const pair of userData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }

//       const formDataObject = {};
// for (const [key, value] of userData.entries()) {
//   formDataObject[key] = value;
// }
      dispatch({ type: REGISTER_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(
        `/api/v1/register`,
        userData,
        // { name, email, password },
        config
      );
  
      dispatch({ type: REGISTER_SUCCESS, 
        payload: data.user });
    } catch (error) {
      dispatch({ 
        type: REGISTER_FAIL, 
        payload:error.response.data.error,
        // payload: error.response.data.message 
      });
    }
  };
  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await axios.get(
        `/api/v1/me`
      );
  
      dispatch({ type: LOAD_USER_SUCCESS, 
        payload: data.user });
    } catch (error) {
      dispatch({ 
        type: LOAD_USER_FAIL, 
        // payload:error.response.data.error,
        // payload: error.response.data.message 
      });
    }
  };
  export const logout = () => async (dispatch) => {
    try {
  
      await axios.get(
        `/api/v1/logout`
      );
  
      dispatch({ type: LOGOUT_SUCCESS});
    } catch (error) {
      dispatch({ 
        type: LOGOUT_FAIL, 
        payload:error.response.data.error,
        // payload: error.response.data.message 
      });
    }
  };



  // update profile
  export const updateProfile = (userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
  // kyunki isme koi image bhj rhe h hmm
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.put(
        `/api/v1/me/update`,
        userData,
        // { name, email, password },
        config
      );
  
      dispatch({ type: UPDATE_PROFILE_SUCCESS, 
        payload: data.success });
    } catch (error) {
      dispatch({ 
        type: UPDATE_PROFILE_FAIL, 
        payload:error.response.data.error,
        // payload: error.response.data.message 
      });
    }
  };


// update password
export const updatePassword = (userData)=> async(dispatch)=>{
  try{
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/password/update`,
      userData,
      // { name, email, password },
      config
    );
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, 
      payload: data.success });
  }catch(error){
    dispatch({ 
      type: UPDATE_PASSWORD_FAIL, 
      payload:error.response.data.error,
      // payload: error.response.data.message 
    });
  }
}

// forgot password
export const forgotPassword = (userData) => async (dispatch)=>{
  try{
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/password/forgot`,
      userData,
      // i.e. { email }
      config
    );
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, 
      payload: data.success });
  }catch(error){
    dispatch({ 
      type: FORGOT_PASSWORD_FAIL, 
      payload:error.response.data.error,
      // payload: error.response.data.message 
    });
  }
}


// reset password
export const resetPassword = (token,userData) => async (dispatch)=>{
  try{
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      userData,
      // i.e. { email }
      config
    );
    dispatch({ type: RESET_PASSWORD_SUCCESS, 
      payload: data.success });
  }catch(error){
    dispatch({ 
      type: RESET_PASSWORD_FAIL, 
      payload:error.response.data.error,
      // payload: error.response.data.message 
    });
  }
}

//   for clear all errors and send present state
export const clearErrors = () => async (dispatch)=>{
  dispatch({type:CLEAR_ERRORS})
}