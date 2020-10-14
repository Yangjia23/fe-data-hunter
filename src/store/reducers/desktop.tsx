import {AnyAction} from 'redux'
import * as TYPES from '../action-types'
import Product from "@/typings/product";
import Menu from "@/typings/menu"
import LOGIN_TYPES from '../../typings/login-types'

export interface DesktopState {
  loginState: LOGIN_TYPES,
  user: any,
  products: Product[],
  menus: Menu[],
}

let initialState: DesktopState = {
  loginState: LOGIN_TYPES.UN_VALIDATE,
  user: null,
  products: [],
  menus: [],
}

export default function(state: DesktopState = initialState, action: AnyAction): DesktopState {
  switch (action.type) {
    case TYPES.VALIDATE:
      if (action.payload.success) {
        return {
          ...state,
          loginState: LOGIN_TYPES.LOGINED,
          user: action.payload.data, //设置用户名
        };
      } else {
        return {
          ...state,
          loginState: LOGIN_TYPES.UNLOGIN,
          user: null, //用户名为空
        };
      }
    case TYPES.GET_PRODUCTS:
      return {...state, products: action.payload.data }
    case TYPES.GET_MENUS:
      return {...state, menus: action.payload }
    default:
      return state
  }
}