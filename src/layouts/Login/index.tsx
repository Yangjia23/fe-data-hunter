import React, {PropsWithChildren} from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router-dom'

interface Params {}
type Props = PropsWithChildren<RouteComponentProps<Params>>

function Login(props: Props) {
  return (
    <div>
      Login
    </div>
  )
}
export default connect()(Login)