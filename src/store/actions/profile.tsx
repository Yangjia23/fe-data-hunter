import * as TYPES from "../action-types";
import { validate, register, login } from "../../api/profile";
import { AnyAction } from "redux";
import { push } from 'connected-react-router';
import { RegisterPayload, LoginPayload, RegisterResult, LoginResult } from '@/typings/user';
import { message } from "antd";

export default {
  validate (): AnyAction {
    return { type: TYPES.VALIDATE, payload: validate() };
  },
  register (data: RegisterPayload) {
    return function(dispatch: any) {
      (async function() {
        try {
          let result: RegisterResult = await register<RegisterResult>(data);
          if (result.success) {
            message.success('注册成功!跳转登录页登录')
            dispatch(push('/login'))
          } else {
            message.error(result.message)
          }
        } catch (error) {
          console.log(error.message)
          debugger
          message.error('register error')
        }
      })()
    }
  },
  login (data: LoginPayload) {
    return function(dispatch: any) {
      (async function(){
        try { 
          let result: LoginResult = await login<LoginResult>(data)
          if (result.success) {
            message.success('登录成功!')
            sessionStorage.setItem('access_token', result.data.token);
            dispatch(push('/profile'));
          } else {
            message.error(result.message);
          }
        } catch (error) {
          message.error('Login Error')
        }
      })()
    }
  },
  logout () {
    return function(dispatch: any) {
      sessionStorage.removeItem('access_token')
      dispatch({ type: TYPES.LOGOUT });
      dispatch(push('/login'));
    }
  },
  changeAvatar(avatar: string) {
    return {
      type: TYPES.CHANGE_AVATAR,
      payload: avatar
    }
  }
};