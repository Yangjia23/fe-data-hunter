import React from 'react'

import { connect } from 'react-redux'


import BasicUser from '@/components/BasicUser'

import { getVistorData } from "@/api/user"

class NewUser extends React.Component {
  
  state= {
    tableColumns: [
      {
        title: '日期',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '正式用户组新增',
        dataIndex: 'newRegularCount',
        key: 'newRegularCount',
      },
      {
        title: '试用用户组添加',
        dataIndex: 'newProbationCount',
        key: 'newProbationCount',
      }
    ],
    tableData: [],
    tableLoading: true,
    addedData: [],
    startTime: '',
    endTime: '',
    dimension: '1',
  }

  componentDidMount() {
    this.getUserData()
  }

  getUserData () {
    const data = require('../../mock/getVistorData.js')
    Promise.resolve(data).then(res => {
      const list = res.data.list
      const addedData: Array<any> = [
        list.map((el: any) => el.time), 
        list.map((el: any) => String(Number(el.newRegularCount) + Number(el.newProbationCount)))
      ]
      this.setState({ 
        tableLoading: false,
        tableData: list.map((el: object, index: number)=> ({ ...el, key: index + 1 })),
        addedData,
      })
    })
    // getVistorData({ 
    //   startTime: '2020-09-12',
    //   endTime: '2020-09-13',
    //   idSite: 1 
    // }).then(res => {
    //   this.setState({ 
    //     tableLoading: false,
    //     vistorData: res.data.list.map((el: object, index: number)=> ({ ...el, key: index + 1 }))
    //   })
    // })
  }

  callback (value: object, getNewData: boolean) {
    const that = this
    this.setState({...value}, function () {
      getNewData && that.getUserData()
    })
  }
  
  changeWeekTab (activeKey: string) {
    const that = this
    this.setState({ dimension: activeKey, activeTrendData: [] }, function () {
      that.getUserData()
    })
  }

  render() {
    const { tableColumns, tableData, addedData } = this.state
    const tabsMenu = [
      { tab: '新增趋势', key: 'active-trend', data: addedData }, 
    ]
    const tabPaneMenu = ['日活跃', '周活跃', '月活跃']

    return (
      <div>
        <BasicUser 
          title="新增用户分析"
          tableColumns={tableColumns}
          tableData={tableData}
          tabsMenu={tabsMenu}
          tabPaneMenu={tabPaneMenu}
          callback={this.callback.bind(this)}
        />
      </div>
    )
  }
}

export default connect()(NewUser)