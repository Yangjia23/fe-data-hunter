import React from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route, Redirect} from 'react-router-dom' // 三个路由组件
import { Provider } from 'react-redux'
import {ConnectedRouter} from 'connected-react-router' // redux绑定路由
import './assets/css/common.less'
import store from './store'
import history from './store/history'
import { ConfigProvider } from 'antd' // 配置
import zh_CN from "antd/lib/locale-provider/zh_CN"; //国际化中文
import Tabs from "./components/Tabs";//引入底部的页签导航
import Home from "./pages/Home";//首页
import Mine from "./pages/Mine";//我的课程
import Profile from "./pages/Profile";//个人中心
import Register from './pages/Register'; //注册
import Login from './pages/Login'; //登录


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider locale={zh_CN}>
        <main className="main-container">
          <Switch>
            // exact 精准匹配
            <Route path="/" exact component={Home} />
            <Route path="/mine" component={Mine} />
            <Route path="/profile" component={Profile} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Redirect to="/" />
          </Switch>
        </main>
        <Tabs />
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));



// ReactDOM.render((
//     <h1>hello</h1>
// ),document.getElementById('root'));