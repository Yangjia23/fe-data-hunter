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
  console.log(props.siderCollapsed)
  useEffect(() => {
    if (!props.menus.length) {
      props.getMenus()
    }
  }, [])
  return (
    <>
      <Link className='logo-link' to={{ pathname: `/` }}>
        <img src={props.siderCollapsed ? logoIconUrl : logoUrl} alt="logo" />
      </Link>
      <CustomMenu menus={props.menus} history={props.history}></CustomMenu>
    </>
  )
}
export default connect()(SectionSider)