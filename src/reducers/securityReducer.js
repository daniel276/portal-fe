import {GET_ALL_USER} from "../actions/types";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

const initialState = {
  user: {},
  users: [],
  validToken: false // this is used as a flag
};

const booleanActionPayload = (payload) => {
  return !!payload; // if there is any payload, set validToken to true
};

export default function(state = initialState, action){
  switch(action.type){
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload
      };

    case GET_ALL_USER:
      return{
        ...state,
        users: action.payload
      };

    default:
      return state;
  }
};