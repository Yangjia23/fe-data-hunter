import React, {PropsWithChildren} from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router-dom'
import Product from '@/typings/product'
import {Select, Dropdown, Menu} from 'antd'
import {LoginOutlined, DownOutlined} from '@ant-design/icons'
import './index.less'

type Props = PropsWithChildren<{
  children?: any,
  history: any,
  products?: Product[],
  getProducts?: any,
  logout?: any,
}>;

const {Option} = Select


function SectionHeader(props: Props) {
  console.log('SectionHeader', props);
  
  const logout = async () => {
    await props.logout();
    props.history.push('/login')
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <span onClick={logout}>
          <LoginOutlined /> 退出登录
        </span>
      </Menu.Item>
    </Menu>
  )
  return (
    <>
      <div className="section-header">
        <Select className="product-filter" style={{width: 192}}>
          {
            props.products && props.products.map((product: Product, index: number) => {
              return (<Option value={product.id}>{product.name}</Option>)
            })
          }
        </Select>
        <div>
          <Dropdown overlay={menu} overlayStyle={{width: '120'}}>
            <div className="username">欢迎您，xxx <DownOutlined /></div>
          </Dropdown>
        </div>
      </div>
    </>
  )
}
export default connect()(SectionHeader)