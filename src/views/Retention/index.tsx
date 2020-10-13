import React, {PropsWithChildren} from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router-dom'

interface Params {}
type Props = PropsWithChildren<RouteComponentProps<Params>>

function Mine(props: Props) {
  return (
    <div>
      留存分析
    </div>
  )
}
export default connect()(Mine)