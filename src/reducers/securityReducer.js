import setJWTToken from "../securityUtils/setJWTToken";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

const initialState = {
  user: {},
  validToken: false
};

const booleanActionPayload = (payload) => {
  if(payload){
    return true
  }else{
    return false
  }
};

export default function(state = initialState, action){
  switch(action.type){
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload
      };

    default:
      return state;
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwttoken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  })
};