import * as TYPES from "../action-types";
import { validate, login } from "../../api/profile";
import { Dispatch } from "redux";
import { push } from 'connected-react-router';
import { RegisterPayload, LoginPayload, RegisterResult, LoginResult, ValidateResult } from '@/typings/user';
import { message } from "antd";

export default {
  validate () {
    // return { type: TYPES.VALIDATE, payload: validate() };
    return function(dispatch: Dispatch) {
        (async function(){
          try { 
            let result: ValidateResult = await validate<ValidateResult>()
            if (!result.data.status) {
              dispatch({ type: TYPES.LOGOUT });
            } 
          } catch (error) {
            message.error(error);
            console.log('logout >>>');
            dispatch({ type: TYPES.LOGOUT });
          }
        })()
      } 
  },
  login (data: LoginPayload) {
    return function(dispatch: Dispatch) {
      (async function(){
        try { 
          let result: LoginResult = await login<LoginResult>(data)
          if (result.success) {
            message.success('登录成功!')
            sessionStorage.setItem('access_token', result.data.token);
            dispatch(push('/'));
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
    return (dispatch: Dispatch) => {
      sessionStorage.removeItem('access_token')
      dispatch({ type: TYPES.LOGOUT });
      dispatch(push('/login'));
    }
  },
};