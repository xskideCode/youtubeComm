import { AUTH, LOGOUT, UPDATE, TOGGLE, CREATE } from "../constants/actionTypes";

const authReducer = (state = { authData: null, toggle: '', users: null, message: null}, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null };
    case UPDATE:
      return { ...state, users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user))};
    case TOGGLE: 
      return { ...state, toggle: action.payload }
    case CREATE:
      return { ...state, message: [ ...state.message, action.payload]};  
    default:
      return state;
  }
};

export default authReducer;
