import React, { Component, useEffect } from 'react'
import Loadable from 'react-loadable'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

function loadingComponent () {
  useEffect(() => {
    NProgress.start()
    return () =>  NProgress.done()
  }, [])
  return <div />
}

export default (loader: () => any, loading = loadingComponent) => {
    return Loadable({
        loader,
        loading
    })
}
