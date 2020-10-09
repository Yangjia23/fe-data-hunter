import React, {PropsWithChildren, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { CombinedState } from "../../store/reducers";
import { ProfileState } from "../../store/reducers/profile";
import {RouteComponentProps} from 'react-router-dom'
import { Descriptions, Button, Alert, Upload, message } from "antd";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import NavHeader from "../../components/NavHeader";
import actions from "../../store/actions/profile";
import LOGIN_TYPES from "../../typings/login-types";
import { AxiosError } from "axios";
import './index.less'

// 当前组件 props 的数据来源
// - 1、mapStateToProps的返回值
// - 2、actions对象类型
// - 3、路由信息
// - 4、用户传入进来的其它属性
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface Params {}
type RouteProps = RouteComponentProps<Params>;
type Props = PropsWithChildren<StateProps & DispatchProps & RouteProps>;

function beforeUpload(file:any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传JPG/PNG 文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片必须小于2MB!');
  }
  return isJpgOrPng && isLt2M;
}

function Profile(props: Props) {
  let [loading, setLoading] = useState(false);
  let content
  // 页面加载后，直接判断是否登录过
  useEffect(() => {
    props.validate().catch((error: AxiosError) => {
      console.error(error.message)
    })
  }, [])

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }else if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log(info.file.response);
      let { success, data, message } = info.file.response;
      if (success) {
        setLoading(false)
        props.changeAvatar(data);
      } else {
        message.error(message);
      }
    }
  };

  const {loginState} = props
  if (loginState === LOGIN_TYPES.UN_VALIDATE) {
    // 未验证
    content = null
  } else if(loginState === LOGIN_TYPES.LOGINED) {
    // 已登录
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传</div>
      </div>
    );

    content = (
      <div className="user-info">
        <Descriptions title="当前登录用户">
          <Descriptions.Item label="用户名">{props.user.username}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>
          <Descriptions.Item label="头像">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://localhost:8000/user/uploadAvatar"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {props.user.avatar ? 
              <img src={props.user.avatar} alt="avatar" style={{ width: '100%' }} /> : 
              uploadButton
            }
          </Upload>
          </Descriptions.Item>
        </Descriptions>
        <Button type="primary"
          onClick={async () => {
            await props.logout();
            props.history.push('/login')
          }}
        >退出登录</Button>
      </div>
    )
  } else {
    content = (
      <>
        <Alert
          type="warning"
          message="当前未登录"
          description="亲爱的用户你好，你当前尚未登录，请你选择注册或者登录"
        />
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Button type="dashed" onClick={() => props.history.push("/login")}>
            登录
          </Button>
          <Button
            type="dashed"
            style={{ marginLeft: "50px" }}
            onClick={() => props.history.push("/register")}
          >
            注册
          </Button>
        </div>
      </>
    )
  }

  return (
    <section>
      <NavHeader history={props.history}>个人中心</NavHeader>
      {content}
    </section>
  )
}

let mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default connect(mapStateToProps, actions)(Profile)