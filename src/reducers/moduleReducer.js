import {
  GET_MODULE,
  GET_MODULE_BY_STUDENT_ID,
  GET_MODULES,
  GET_CLASSES,
  GET_CLASS,
  GET_MODULES_BY_USERNAME
} from "../actions/types";


const initialState = {
  module: {},
  modules: [],
  studentModules: [],
  classObj: {},
  classes: []
};

export default function(state = initialState, action){
  switch (action.type) {
    case GET_MODULES:
      return{
        ...state,
        modules: action.payload
      };

    case GET_CLASSES:
      return{
        ...state,
        classes: action.payload
      };

    case GET_CLASS:
      return{
        ...state,
        classObj: action.payload
      };

    case GET_MODULE:
      return{
        ...state,
        module: action.payload
      };

    case GET_MODULE_BY_STUDENT_ID:
      return{
        ...state,
        studentModules: action.payload
      };

    case GET_MODULES_BY_USERNAME:
      return{
        ...state,
        studentModules: action.payload
      };

    default:
      return state;

  }
}