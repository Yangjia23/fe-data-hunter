import {AnyAction} from 'redux'
import * as TYPES from '../action-types'
import LOGIN_TYPES from '../../typings/login-types'
export interface ProfileState {
  loginState: LOGIN_TYPES,
  user: any,
  error: string | null
}

let initialState: ProfileState = {
  loginState: LOGIN_TYPES.UN_VALIDATE,
  user: null,
  error: null
}

export default function(state: ProfileState = initialState, action: AnyAction): ProfileState {
  switch (action.type) {
    case TYPES.VALIDATE:
      if (action.payload.success) {
        return {
          ...state,
          loginState: LOGIN_TYPES.LOGINED,
          user: action.payload.data, //设置用户名
          error: null, //没有错误
        };
      } else {
        return {
          ...state,
          loginState: LOGIN_TYPES.UNLOGIN,
          user: null, //用户名为空
          error: action.payload, //错误对象赋值
        };
      }
    case TYPES.LOGOUT:
      return {
        ...state,
        loginState: LOGIN_TYPES.UN_VALIDATE,
        user: null,
        error: null
      }
    default:
      return state
  }
}