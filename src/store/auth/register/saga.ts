import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import API from "src/helpers/api";
import { getAuthHeaders, handleLogout } from "src/utils/authHelpers";

// Login Redux States
import { CREATE_ADMIN_USER } from "./actionTypes";
import { apiRegisterError, registerSuccess } from "./actions";


function* registerUserSaga({ payload: { user, key, handleSuccess, setIsLoading } }: { payload: { user: { email: string; password: string }, key:string, handleSuccess: any, setIsLoading: any} }): any {
    try {
    const authHeaders = getAuthHeaders(); // You can get this from a helper, state, or redux store

    const response = yield API.post("user/admin/register", user, authHeaders);
    console.log("response: ", response);
    const data = response?.data
    if(data.success === true) {
      toast.success(data.message);
  } else {
      toast.error(data.message);
  }
    setIsLoading(false)
    handleSuccess(response?.data || {}, key);
    yield put(registerSuccess({ ...data, isLoggedIn: true }));
  } catch (error: any) {
    console.log("error: ", error);
    if (error.message === 'Unauthorized' || error?.response?.data?.statusCode === 401) {
      handleLogout(); // Handle logout (e.g., redirect to login or clear session)
    }
    if (error?.response) {
      const errorResponse = JSON.parse(error?.response)
      yield put(apiRegisterError(errorResponse?.data?.message));
    } else {
      yield put(apiRegisterError(error.message));
    }
    setIsLoading(false);
    const errorMessage = error?.response?.data?.message || error.message;
    toast.error(errorMessage);
  }
}



function* watchRegisterUser() {
  // @ts-expect-error
  yield takeEvery(CREATE_ADMIN_USER, registerUserSaga);
}

export default watchRegisterUser;
