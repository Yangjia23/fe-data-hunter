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

import Login from './layouts/Login'; //登录
import Desktop from './layouts/Desktop'


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider locale={zh_CN}>
        <main className="main-container">
          <Switch>
            // exact 精准匹配
            <Route path="/" exact render={() => <Redirect to="/desktop"/>}/>
            <Route path="/login" component={Login} />
            <Route component={Desktop} />
          </Switch>
        </main>
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));



// ReactDOM.render((
//     <h1>hello</h1>
// ),document.getElementById('root'));