import React, { PropsWithChildren } from 'react'

import { connect } from 'react-redux'

import { RouteComponentProps } from 'react-router-dom'

import { Tabs } from 'antd'

import BasicUser from '@/components/BasicUser'

import Charts from '@/components/Chart'

import { getVistorData } from "@/api/user"

const { TabPane } = Tabs

interface Params {}

type Props = PropsWithChildren<RouteComponentProps<Params>>

class ActiveUser extends React.Component {

  state= {
    tableColumns: [
      {
        title: '日期',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '正式用户组活跃',
        dataIndex: 'activeRegularCount',
        key: 'activeRegularCount',
      },
      {
        title: '正式用户活跃构成（新用户占比）',
        dataIndex: 'newRegularCount',
        render: (newRegularCount: string, record: { activeRegularCount: string })  => `${Number(newRegularCount) / Number(record.activeRegularCount) * 100}%`,
        key: 'newRegularCount',
      },
      {
        title: '试用用户组活跃',
        dataIndex: 'activeProbationCount',
        key: 'activeProbationCount',
      },
      {
        title: '试用用户活跃构成（新用户占比）',
        dataIndex: 'newProbationCount',
        render: (newProbationCount: string, record: { activeProbationCount: string })  => `${Number(newProbationCount) / Number(record.activeProbationCount) * 100}%`,
        key: 'newProbationCount',
      }
    ],
    tableData: [],
    tableLoading: true,
    dayActiveUsers: [],
    dimension: '1',
  }
   
  componentDidMount() {
    this.getUserData()
  }

  callback (startTime: string, endTime: string) {
    this.setState({ startTime, endTime })
  }

  getUserData () {
    const data = require('../../mock/getVistorData.js')
    console.log('11111', this.state.dimension)
    Promise.resolve(data).then(res => {
      const list = res.data.list
      const { dimension } = this.state
      // let userInfo: Array<Array<object>> = {}
      // switch(dimension) {
      //   case 1: userInfo['dayActiveUsers'] = list.map((el: any) => ({ time: el.time, value: Number(el.activeRegularCount) + Number(el.activeProbationCount) }))
      // }
      this.setState({ 
        tableLoading: false,
        tableData: list.map((el: object, index: number)=> ({ ...el, key: index + 1 })),
        dayActiveUsers: [list.map((el: any) => el.time), list.map((el: any) => (Number(el.activeRegularCount) + Number(el.activeProbationCount)))]
      })
    })
    // const { startTime, endTime, dimension } = this.state
    // getVistorData({ 
    //   startTime,
    //   endTime,
    //   idSite: 1,
    //   dimension
    // }).then(res => {
    //   this.setState({ 
    //     tableLoading: false,
    //     vistorData: res.data.list.map((el: object, index: number)=> ({ ...el, key: index + 1 }))
    //   })
    // })
  }

  changeTab (activeKey: string) {
    const that = this
    this.setState({ dimension: activeKey }, function () {
      that.getUserData()
    })
  }

  render() {
    const { tableColumns, tableData, tableLoading, dayActiveUsers, dimension } = this.state
    return (
      <div>
        <BasicUser
          ref="basicUser"
          title="活跃用户分析"
          tableColumns={tableColumns}
          tableData={tableData}
          tableLoading={tableLoading}
          children={ 
            <Tabs defaultActiveKey="active-trend">
              <TabPane tab="活跃趋势" key="active-trend">
                <div className="active-detail">
                  <Tabs activeKey={dimension} onChange={this.changeTab.bind(this)} >
                    <TabPane tab="日活跃" key="1">
                      {
                        dayActiveUsers.length && <Charts chartData={dayActiveUsers}></Charts>
                      }
                    </TabPane>
                    <TabPane tab="周活跃" key="2">
                    </TabPane>
                    <TabPane tab="月活跃" key="3"></TabPane>
                  </Tabs>
                </div>
              </TabPane>
              <TabPane tab="活跃构成" key="active-form">
                <div className="active-detail">
                  <Tabs activeKey={dimension} onChange={this.changeTab.bind(this)} >
                    <TabPane tab="日活跃" key="1">
                      {
                        dayActiveUsers.length && <Charts chartData={dayActiveUsers}></Charts>
                      }
                    </TabPane>
                    <TabPane tab="周活跃" key="2">
                    </TabPane>
                    <TabPane tab="月活跃" key="3"></TabPane>
                  </Tabs>
                </div>
              </TabPane>
            </Tabs> 
          }
          callback={this.callback}
        />
      </div>
    )
  }
}

export default connect()(ActiveUser)