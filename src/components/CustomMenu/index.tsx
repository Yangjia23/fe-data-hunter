import React, { useState, useEffect } from 'react'
import './index.less'
import { Menu } from 'antd'
import { Link } from "react-router-dom";
import TMenu from '@/typings/menu'
import Icon from '@ant-design/icons';

interface Props{
  history: any,
  menus: TMenu[]
}

const { SubMenu } = Menu;

const getOpenKeys = (path: string): string[] => {
  const pathList = path.split('/').map(item => `/${item}`)
  let newStr = '', newArr = []
  for (let i = 1; i < pathList.length - 1; i++) {
    newStr += pathList[i]
    newArr.push(newStr)
  }
  return newArr
}

function NavHeader(props: Props) {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const {pathname} = props.history.location
    const defaultOpenKeys = getOpenKeys(pathname)
    setSelectedKeys([pathname])
    setOpenKeys([...defaultOpenKeys])
  }, [])

  const renderChildren = (menus: TMenu[]) => {
    return menus.map((menu: TMenu) => {
      const MenuIcon = () => <Icon  style={{ fontSize: '14px' }} component={menu.icon}/>;
      return menu.children.length ? (
        <SubMenu 
          title={menu.title} 
          key={menu.path}
          icon={ <MenuIcon />}
        >
          {renderChildren(menu.children)}
        </SubMenu>
      ) : (
        <Menu.Item key={menu.path}>
          <Link to={menu.path}>
            { menu.icon && <Icon type={menu.icon} /> }
            <span>{menu.title}</span>
          </Link>
        </Menu.Item>
      )
    })
  }

  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) {
      setOpenKeys(openKeys)
      return
    }
    const latestOpenKey = openKeys[openKeys.length - 1]
    if (latestOpenKey.includes(openKeys[0])) {
      setOpenKeys(openKeys)
    } else {
      setOpenKeys([latestOpenKey])
    }
  }
  const onMenuClick = (key: string) => {
    setSelectedKeys([key])
  }
  return (
    <Menu mode="inline"
      style={{ height: '100%', borderRight: 0 }}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onClick={({key}) => onMenuClick(key)}
      onOpenChange={(openKeys: string[]) => onOpenChange(openKeys)}
    >
      {
        renderChildren(props.menus)
      }
    </Menu>
  )
}

export default NavHeader