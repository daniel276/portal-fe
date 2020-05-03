import { combineReducers } from "redux";
import securityReducer from "./securityReducer";
import moduleReducer from "./moduleReducer";
import errorReducer from "./errorReducer";
import storageReducer from "./storageReducer";
import attendanceReducer from "./attendanceReducer";

export default combineReducers({
  security: securityReducer,
  storage: storageReducer,
  module: moduleReducer,
  attendance: attendanceReducer,
  errors: errorReducer
})
