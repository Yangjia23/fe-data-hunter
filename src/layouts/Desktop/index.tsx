import React, { PropsWithChildren, useEffect, useState } from 'react';
import { connect } from 'react-redux';
const echarts = require('echarts/lib/echarts');
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom';
import desktopActions from '@/store/actions/desktop';
import profileActions from '@/store/actions/profile';
import { CombinedState } from '@/store/reducers';
import { AxiosError } from 'axios';

import { Layout } from 'antd';
import './index.less';

import SectionHeader from './components/SectionHeader';
import SectionSider from './components/SectionSider';
import routes from '@/routes';

type StateProps = ReturnType<typeof mapStateToProps>;
type mapDispatchToPropsFunction<T> ={
  [K in  keyof T]:(...args:any)=>void| {type:string, payload:any}
}

type DispatchProps = typeof desktopActions & mapDispatchToPropsFunction<typeof profileActions>;

interface Params {}
type Props = PropsWithChildren<
  RouteComponentProps<Params> & StateProps & CombinedState & DispatchProps
>;

const { Sider, Header, Content } = Layout;

function Desktop(props: Props) {
  const {desktop, profile} = props
  const [siderCollapsible, setSiderCollapsible] = useState(false)
  // 页面加载后，直接判断是否登录过
  useEffect(() => {
    props.validate()
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      echarts.init(document.getElementById('chartCard')).resize()
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [siderCollapsible])

  return (
    <>
      <Layout className="desktop-layout">
        <Sider
          theme="light"
          className="desktop-layout-sider"
          width="240"
          collapsible
          onCollapse={(collapsed) => {setSiderCollapsible(collapsed)}}
        >
          <SectionSider
            menus={desktop.menus}
            history={props.history}
            getMenus={props.getMenus}
            siderCollapsed={siderCollapsible}
          ></SectionSider>
        </Sider>
        <Layout>
          <Header
            style={{ background: '#fff' }}
            className="desktop-layout-header"
          >
            <SectionHeader
              products={desktop.products}
              history={props.history}
              logout={props.logout}
              getProducts={props.getProducts}
            ></SectionHeader>
          </Header>
          <Content className="desktop-layout-content">
            <Switch>
              {routes.map((item) => {
                return (
                  <Route
                    key={item.path}
                    path={item.path}
                    exact={item.exact}
                    render={(props) => <item.component {...props} />}
                  ></Route>
                );
              })}
              <Redirect to="/404" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
let mapStateToProps = (state: CombinedState): CombinedState => state;

export default connect(mapStateToProps, {...desktopActions, ...profileActions})(Desktop);
