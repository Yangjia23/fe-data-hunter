import React, {PropsWithChildren, useEffect} from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router-dom'
import { Link } from "react-router-dom";
import Menu from '@/typings/menu'
import logoUrl from '@/assets/images/logo.svg'
import CustomMenu from '@/components/CustomMenu'
import './index.less'

type Props = PropsWithChildren<{
  children?: any,
  history: any,
  menus: Menu[],
  getMenus?: any,
}>;

function SectionSider(props: Props) {
  useEffect(() => {
    if (!props.menus.length) {
      props.getMenus()
    }
  }, [])
  console.log('props.menus', props.menus)
  return (
    <>
      <Link className='logo-link' to={{ pathname: `/` }}>
        <img src={logoUrl} alt="logo" />
      </Link>
      <CustomMenu menus={props.menus} history={props.history}></CustomMenu>
    </>
  )
}
export default connect()(SectionSider)