import React, { PropsWithChildren } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { ProfileState } from '@/store/reducers/profile';
import { CombinedState } from '@/store/reducers';
import actions from '@/store/actions/profile';
import logoUrl from '@/assets/images/logo.svg';
import './index.less';

type StateProps = ReturnType<typeof mapStateToProps>;
type mapDispatchToPropsFunction<T> ={
  [K in  keyof T]:(...args:any)=>void| {type:string, payload:any}
}

type DispatchProps=mapDispatchToPropsFunction<typeof actions>
interface Params {}
type Props = PropsWithChildren<
  RouteComponentProps<Params> & StateProps & CombinedState & DispatchProps
>;

function Login(props: Props) {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.login(values);
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <img className="login-box__image" src={logoUrl} alt="Logo"/>
          <div className="login-box__title">登录</div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Row justify="space-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住用户名</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="">
                  忘记密码？
                </a>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

let mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default connect(mapStateToProps, actions)(Login);
