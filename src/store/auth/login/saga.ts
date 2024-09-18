import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import API from "src/helpers/api";
import { getAuthHeaders, handleLogout } from "src/utils/authHelpers";

// Login Redux States
import { FETCH_USER_PROFILE, LOGIN_USER, LOGOUT_USER_REQUEST } from "./actionTypes";
import { apiLoginError, loginSuccess, logoutUserFailure, logoutUserSuccess } from "./actions";





function* loginUserSaga({ payload: { user, key, handleSuccess, setIsLoading } }: { payload: { user: { email: string; password: string }, key:string, handleSuccess: any, setIsLoading: any} }): any {
    try {
    console.log(user, "saga calling");
    const authHeaders = getAuthHeaders(); // You can get this from a helper, state, or redux store
    // Call the API using the post method of API.xhr class
    // const response = yield call(API.post, '/UserDetails/UserLogin', user, authHeaders);
    const response = yield API.post("user/admin/login", user, authHeaders);
    console.log("response: ", response);
    const data = response?.data
    if(response.data.success === true) {
      toast.success(response?.data?.message);
  } else {
      toast.error(response?.data?.message);
  }
    // console.log(response?.data)
    // localStorage.setItem("accessToken", JSON.stringify(response?.data?.token));
    setIsLoading(false)
    handleSuccess(response?.data || {}, key);
    yield put(loginSuccess({ ...data, isLoggedIn: true }));
  } catch (error: any) {
    console.log("error: ", error);
    if (error.message === 'Unauthorized' || error?.response?.data?.statusCode === 401) {
      handleLogout(); // Handle logout (e.g., redirect to login or clear session)
    }
    if (error?.response) {
      const errorResponse = JSON.parse(error?.response)
      yield put(apiLoginError(errorResponse?.data?.message));
    } else {
      yield put(apiLoginError(error.message));
    }
    setIsLoading(false);
    const errorMessage = error?.response?.data?.message || error.message;
    toast.error(errorMessage);
  }
}

function* fetchProfileSaga():any {
  try {
    const response = yield API.get('user/admin/profile/me');
    console.log("response", response);
    yield put(loginSuccess({...response.data, isLoggedIn: true }));  // store user data on successful login
  } catch (error: any) {
    yield put(apiLoginError(error.message));
  }
}


function* logoutUserSaga():any {
  try {
    // Make API call to perform logout
    const response = yield API.get('user/admin/logout');
    toast.success(response?.data?.message); 
    yield put(logoutUserSuccess());
  } catch (error:any) {
    toast.error(error?.response?.data?.message || "Something went wrong");
    yield put(logoutUserFailure(error?.response?.data?.message || error.message));
  }
}

function* watchLoginUser() {
  // @ts-expect-error
  yield takeEvery(LOGIN_USER, loginUserSaga);
  yield takeEvery(LOGOUT_USER_REQUEST, logoutUserSaga);
  yield takeLatest(FETCH_USER_PROFILE, fetchProfileSaga);
}

export default watchLoginUser;
