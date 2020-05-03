import {GET_USER_BIOMETRICS} from "../actions/types";

const initialState = {
  biometrics: [],
};

export default function(state = initialState, action){
  switch(action.type){
    case GET_USER_BIOMETRICS:
      return {
        ...state,
        biometrics: action.payload
      };

    default:
      return state;
  }
};

