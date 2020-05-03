import axios from "axios";

import {
  GET_ERRORS,
  GET_MODULE_BY_STUDENT_ID,
  GET_MODULES,
  GET_MODULE,
  GET_CLASSES,
  GET_CLASS, GET_MODULES_BY_USERNAME
} from "./types";
import {BASE_URL} from "../constants/constant";

export const addModule = (moduleData, history) => async dispatch => {
  try{
    await axios.post(`${BASE_URL}/module/add`, moduleData);
    history.push("/staff/course");
    window.location.reload();
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const getModules = () => async dispatch => {
  const res = await axios.get(`${BASE_URL}/module/all`);
  dispatch({
    type: GET_MODULES,
    payload: res.data
  })
};

export const getModule = (id) => async dispatch => {
  const res = await axios.get(`${BASE_URL}/module/${id}`);
  dispatch({
    type: GET_MODULE,
    payload: res.data
  })
};

export const getClasses = (id) => async dispatch => {
  const res = await axios.get(`${BASE_URL}/classes/${id}`);
  dispatch({
    type: GET_CLASSES,
    payload: res.data
  })
};

export const getClass = (id) => async dispatch => {
  const res = await axios.get(`${BASE_URL}/classes/find/${id}`);
  dispatch({
    type: GET_CLASS,
    payload: res.data
  })
};

export const addClass = (classData , module_id) => async dispatch => {
  try {
    await axios.post(`${BASE_URL}/classes/${module_id}`, classData);
    window.location.reload();
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const addStudentModule = (data, student_id, module_id) => async dispatch => {
  try {
    if(window.confirm("You will be enrolled to this module, continue?")){
      await axios.post(`${BASE_URL}/enroll/add/${module_id}/${student_id}`, data);
      window.location.reload();
    }
  }catch (e) {
  }
};

export const getModulesByStudentId = (student_id) => async dispatch => {
  const res = await axios.get(`${BASE_URL}/enroll/student?id=${student_id}`);
  dispatch({
    type: GET_MODULE_BY_STUDENT_ID,
    payload: res.data
  })
};

export const getModulesByUsername = (username) => async dispatch => {
  const res = await axios.get(`${BASE_URL}/enroll/find/module/${username}`);
  dispatch({
    type: GET_MODULES_BY_USERNAME,
    payload: res.data
  })
};
