import axios from "axios";
import {GET_ERRORS, GET_USER_BIOMETRICS} from "./types";
import {BASE_URL} from "../constants/constant";

export const getUserBiometrics = username => async dispatch => {
  try{
    const res = await axios.get(`${BASE_URL}/storage/biometrics/${username}`);
    dispatch({
      type: GET_USER_BIOMETRICS,
      payload: res.data
    })
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e
    })
  }
};

export const uploadBiometrics = (file, username) => async dispatch => {
  try{
    await axios.post(`${BASE_URL}/storage/upload/biometric/${username}`, file);
    window.location.reload();
  }catch (e) {
    console.log(e)
  }
};

export const uploadProfilePicture = (file, username) => async dispatch => {
  try {
    await axios.post(`${BASE_URL}/storage/upload/profile/${username}`, file);
    window.location.reload();
  }catch (e) {
    console.log(e)
  }
};

export const deleteBiometrics = (username, file_id) => async dispatch => {
  if(window.confirm("Are you sure want to delete this file")){
    await axios.delete(`${BASE_URL}/storage/biometric/${username}/${file_id}`);
    window.location.reload();
  }
};

