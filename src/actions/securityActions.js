import axios from "axios";
import jwt_decode from 'jwt-decode';
import setJWTToken from "../securityUtils/setJWTToken";
import { BASE_URL } from "../constants/constant";
import {GET_ALL_USER, GET_ERRORS, SET_CURRENT_USER} from "./types";
import setJTWTToken from "../securityUtils/setJWTToken";

export const login = loginRequest => {
  return async dispatch => {
    try {
      //post login request
      //hit endpoint
      const res = await axios.post(`${BASE_URL}/user/login`, loginRequest);
      //extract token from res.data
      const {token} = res.data;

      if (token) {
        //set the token in our localStorage
        localStorage.setItem("jwttoken", token);
        //set our token in the header
        setJWTToken(token);
        //decode the token
        const decoded = jwt_decode(token);
        //dispatch to securityReducer
        dispatch({
          type: SET_CURRENT_USER,
          payload: decoded
        })
      }
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
  };
};

export const registerStudent = (studentData, history) => async dispatch => {
  try{
    await axios.post(`${BASE_URL}/user/register`, studentData);
    history.push("/staff/enrollment");
    window.location.reload();
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const getAccount = (id) => async dispatch => {
  try{
    const res = await axios.get(`${BASE_URL}/user/${id}`);
    dispatch({
      type: SET_CURRENT_USER,
      payload: res.data
    })
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const getAllAccounts = () => async dispatch => {
  try {
    const res = await axios.get(`${BASE_URL}/user/all`);
    dispatch({
      type: GET_ALL_USER,
      payload: res.data
    })
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const changePassword = (data) => async dispatch => {
  try {
    if(window.confirm("Confirm change password?, Continue?")){
      await axios.patch(`${BASE_URL}/user/update`, data);
      window.location.reload();
    }
  }catch (e) {
    console.log(e);
  }
};

export const resetPassword = (user_id) => async dispatch => {
  try {
    if(window.confirm("This action will reset password for selected user, continue?")){
      await axios.patch(`${BASE_URL}/user/reset-password/${user_id}`);
      window.location.reload();
    }
  }catch (e) {
    console.log(e)
  }
};

export const changeProfile = (data) => async dispatch => {
  try {
    await axios.patch(`${BASE_URL}/user/update`, data);
    window.location.reload()
  }catch (e) {
    console.log(e)
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwttoken");
  setJTWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  })
};