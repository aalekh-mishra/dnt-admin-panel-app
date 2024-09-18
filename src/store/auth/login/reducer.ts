
import { LOGIN_API_ERROR, LOGIN_SUCCESS, LOGIN_USER, LOGOUT_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS } from "./actionTypes";

 
  export interface ILoginState {
    loading: boolean;
    roleId?: number;
    userId?: number;
    userCode?: string;
    error?: string
    result?: string;
    accessToken?: string;
    setAuth?: {
      imageUrl: string;
      validatekey: string;
    };
    email?: string;
    menus: IMenuState[];
    isLoggedIn: boolean;
  }
  
  export interface IMenuState {
      parentMenu: Imenu
      subMenus: Imenu[]
  }
  export interface Imenu {
    roleID: number;
        menuId: number;
        parentMenuId: number;
        menuName: string;
        details:{
          route:string;
          icon?:string;
          sortOrder:number;
        }
        view_Flag: boolean;
        add_Flag: boolean;
        modify_Flag: boolean;
        delete_Flag: boolean;
        chaker_Flag: boolean;
        firmID: number;
  }
  const initialState:ILoginState = {
    error: "",
    loading: false,
    isLoggedIn:false,
    menus:[]
  }
  
  const LoginReducer = (state:any, action:any) => {
    state = initialState
    switch (action.type) {
      case LOGIN_USER:
        state = {
          ...state,
          loading: true,
        }
        break
      case LOGIN_SUCCESS:
        // console.log("...action.payload: ", action.payload)
        state = {
          ...state,
          ...action.payload,
          loading: false,
        }
        break
      case LOGOUT_USER_REQUEST:
        state = {
          ...state,
          error: "",
        }
        break
      case LOGOUT_USER_SUCCESS:
        state = { ...initialState }
        break
      case LOGOUT_USER_FAILURE:
        state = {
          ...state,
          error: action.payload,
          loading: false,
        }
        break
      case LOGIN_API_ERROR:
        state = { ...state, error: action.payload, loading: false }
        break
      default:
        state = { ...state }
        break
    }
    return state
}
  
export default LoginReducer
