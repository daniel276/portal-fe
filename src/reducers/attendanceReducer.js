import {GET_ATTENDANCE_BY_USER_ID} from "../actions/types";

const initialState = {
  attendances: [],
};

export default function(state = initialState, action){
  switch(action.type){
    case GET_ATTENDANCE_BY_USER_ID:
      return {
        ...state,
        attendances: action.payload
      };

    default:
      return state;
  }
};
