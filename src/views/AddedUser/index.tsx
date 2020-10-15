import React, { PropsWithChildren } from 'react'

import { connect } from 'react-redux'

import { RouteComponentProps } from 'react-router-dom'

import { Tabs } from 'antd'

import BasicUser from '@/components/BasicUser'

import Charts from '@/components/Chart'

import { getVistorData } from "@/api/user"

interface Params {}
type Props = PropsWithChildren<RouteComponentProps<Params>>

const { TabPane } = Tabs

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
    dayAddedUsers: [],
    weekAddedUsers: [],
  }

  componentDidMount() {
    const data = require('../../mock/getVistorData.js')
    Promise.resolve(data).then(res => {
      const list = res.data.list
      this.setState({ 
        tableLoading: false,
        tableData: list.map((el: object, index: number)=> ({ ...el, key: index + 1 })),
        dayAddedUsers: list.map((el: any) => ({ time: el.time, value: Number(el.newRegularCount) + Number(el.newProbationCount) })),
        weekAddedUsers:  list.map((el: any) => ({ time: el.time }))
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

  render() {
    const { tableColumns, tableData, dayAddedUsers, weekAddedUsers } = this.state
    return (
      <div>
        <BasicUser 
          title="新增用户分析"
          tableColumns={tableColumns}
          tableData={tableData}
          children={ 
            <Tabs defaultActiveKey="active-trend" >
              <TabPane tab="新增趋势" key="active-trend">
                <div className="active-detail">
                  <Tabs defaultActiveKey="day">
                    <TabPane tab="日活跃" key="day">
                      {
                        dayAddedUsers.length && <Charts chartData={dayAddedUsers}></Charts>
                      }
                    </TabPane>
                    <TabPane tab="周活跃" key="week">
                      {
                        weekAddedUsers.length && <Charts chartData={weekAddedUsers}></Charts>
                      }
                    </TabPane>
                    <TabPane tab="月活跃" key="month"></TabPane>
                  </Tabs>
                </div>
              </TabPane>
            </Tabs> 
          }
        />
      </div>
    )
  }
}

export default connect()(NewUser)