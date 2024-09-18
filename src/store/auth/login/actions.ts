import { 
  LOGIN_API_ERROR, 
  LOGIN_SUCCESS, 
  LOGIN_USER, 
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  FETCH_USER_PROFILE,
} from "src/store/auth/login/actionTypes";


export const loginAdminUser = ({userData, handleSuccess, key, setIsLoading}:any) => ({
  type: LOGIN_USER,
  payload: {
    user: userData,
    key,
    handleSuccess,
    setIsLoading
  },
});

export const fetchProfileOnLoad = () => ({
  type: FETCH_USER_PROFILE,
  payload: {},
})

export const loginSuccess = (user:any) => ({
  type: LOGIN_SUCCESS,
  payload: user,
})

export const logoutUserRequest = () => ({
  type: LOGOUT_USER_REQUEST,
  payload: {},  
})
  
export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
  payload: {},
})

export const logoutUserFailure = (message:any) => ({
  type: LOGOUT_USER_FAILURE,
  payload: message,
});
  
export const apiLoginError = (error: any) => ({
  type: LOGIN_API_ERROR,
  payload: error,
});
  