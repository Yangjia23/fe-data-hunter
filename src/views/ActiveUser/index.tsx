import React, {PropsWithChildren} from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router-dom'
import './index.less'

interface Params {}
type Props = PropsWithChildren<RouteComponentProps<Params>>

function Mine(props: Props) {
  return (
    <div className="demo">
      活跃用户
    </div>
  )
}
export default connect()(Mine)