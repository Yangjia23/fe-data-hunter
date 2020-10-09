import React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, Link} from 'react-router-dom'
import { CombinedState } from "../../store/reducers";
import { ProfileState } from "../../store/reducers/profile";
import actions from '../../store/actions/profile'
import NavHeader from "../../components/NavHeader";
import {Form, Input, Button, message} from 'antd'
import {UserAddOutlined, LockOutlined, MailOutlined} from '@ant-design/icons'
import './index.less'

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions;
interface Params {}
type Props = RouteComponentProps<Params> & StateProps & DispatchProps

function Register(props: Props) {
  const onFinish = (values: any) => {
    props.register(values);
  };
  const onFinishFailed = (errorInfo: any) => {
    message.error("表单验证失败!");
  };
  return (
    <>
      <NavHeader history={props.history}>用户注册</NavHeader>
      <Form className="register-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入你的用户名!' }]}
        >
          <Input placeholder="用户名" prefix={<UserAddOutlined />}/>
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入你的密码!' }]}
        >
          <Input placeholder="密码" type="password" prefix={<LockOutlined />}/>
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[{ required: true, message: '请输入你的确认密码!' }]}
        >
          <Input placeholder="确认密码" type="password" prefix={<LockOutlined />}/>
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: '请输入你的邮箱!' }]}
        >
          <Input placeholder="邮箱" type="email" prefix={<MailOutlined />}/>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
          或者 <Link to="/login">立刻登录!</Link>
        </Form.Item>
      </Form>
    </>
  )
}
const mapStateToProps = (state: CombinedState): ProfileState => state.profile
export default connect(mapStateToProps, actions)(Register)