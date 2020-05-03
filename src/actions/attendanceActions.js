import axios from "axios";
import { BASE_URL } from "../constants/constant";
import {GET_ATTENDANCE_BY_USER_ID} from "./types";

export const recordAttendance = (username, class_id, history) => async dispatch => {
  try {
    await axios.post(BASE_URL + `/attendance/record/${username}/${class_id}`)
        .then(function(response){
          if(response.status === 201){
           history.push("/attendance/status/success")
          }
          // window.location.reload();
        }).catch(function(error){
          if(error.response.status === 423){
            window.alert("Invalid class session, please check the date/time!");
          }
        })
  }catch (e) {
  }
};

export const getAttendanceByStudentId = (id) => async dispatch => {
  const res = await axios.get(BASE_URL + `/attendance/log/${id}`);
  dispatch({
    type: GET_ATTENDANCE_BY_USER_ID,
    payload: res.data
  })
};