
import {  CREATE_ADMIN_USER, REGISTER_API_ERROR, REGISTER_SUCCESS } from "./actionTypes";



  const initialState:any = {
    error: "",
    loading: false,
  }
  
  const RegisterReducer = (state:any, action:any) => {
    state=initialState
    switch (action.type) {
      case CREATE_ADMIN_USER:
        state = {
          ...state,
          loading: true,
        }
        break
      case REGISTER_SUCCESS:
        state = {
          ...state,
          ...action.payload,
          loading: false,
        }
        break;
      case REGISTER_API_ERROR:
        state = { ...state, error: action.payload, loading: false }
        break;
      default:
        state = { ...state }
        break;
    }
    return state
}
  
export default RegisterReducer
