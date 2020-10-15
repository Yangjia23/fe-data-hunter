import React, {PropsWithChildren, useEffect} from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router-dom'
import { Link } from "react-router-dom";
import Menu from '@/typings/menu'
import logoUrl from '@/assets/images/logo.svg'
import logoIconUrl from '@/assets/images/logo-icon.svg'
import CustomMenu from '@/components/CustomMenu'
import './index.less'

type Props = PropsWithChildren<{
  children?: any,
  history: any,
  menus: Menu[],
  getMenus?: any,
  siderCollapsed: boolean
}>;

function SectionSider(props: Props) {
  useEffect(() => {
    if (!props.menus.length) {
      props.getMenus()
    }
  }, [])
  return (
    <>
      <a className='logo-link' onClick={() => props.history.push('/')}>
        <img src={props.siderCollapsed ? logoIconUrl : logoUrl} alt="logo" />
      </a>
      <CustomMenu menus={props.menus} history={props.history}></CustomMenu>
    </>
  )
}
export default connect()(SectionSider)