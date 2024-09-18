import { CREATE_ADMIN_USER, REGISTER_API_ERROR, REGISTER_SUCCESS } from "./actionTypes";

export const registerAdminUser = ({userData, handleSuccess, key, setIsLoading}:any) => ({
    type: CREATE_ADMIN_USER,
    payload: {
      user: userData,
      key,
      handleSuccess,
      setIsLoading
    },
});

export const registerSuccess = (user:any) => ({
    type: REGISTER_SUCCESS,
    payload: user,
});
    
export const apiRegisterError = (error: any) => ({
    type: REGISTER_API_ERROR,
    payload: error,
});