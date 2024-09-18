import { combineReducers } from "redux";

// import Layout from "./layout/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import RegisterReducer from "./auth/register/reducer";

// import Account from "./auth/register/reducer";
// import ForgetPassword from "./auth/forgetpwd/reducer";
// import Profile from "./auth/profile/reducer";

// Users List
// import usersReducer from "./admin/Users/reducer";


const rootReducer = combineReducers({
//   Layout,
  LoginReducer,
  RegisterReducer,
//   usersReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
