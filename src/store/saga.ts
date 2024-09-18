import { all, fork } from "redux-saga/effects";

import watchLoginUser from "./auth/login/saga";
import watchRegisterUser from "./auth/register/saga";

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchRegisterUser),
  ]);
}
