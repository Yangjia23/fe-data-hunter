import React from 'react'

import { DatePicker, Card, Tabs, Table, Button, message } from 'antd'

import moment from 'moment';

import './index.less'
import reducer from '@/store/reducers'

const { RangePicker } = DatePicker

const { TabPane } = Tabs;

interface IProps {
  title: string,
  tableColumns: Array<object>,
  tableData: Array<object>,
  tableLoading?: boolean,
  callback: any,
}

export default class BasicUser extends React.Component<IProps> {
  state = {
    vistorData: [],
    startTime: moment(),
    endTime: moment().add(7, 'days'),
    page: 1,
    pageSize: 10,
  }

  rangeChange (value: string) {
    if (value === null) {
      message.error('请选择一个时间范围')
      return
    }
    this.props.callback(this.state.startTime, this.state.endTime)
  }

  tablePageChange (page: number) {
    this.setState({ page })
  }

  render() {
    const { startTime, endTime, page, pageSize } = this.state
    const { title, tableColumns, tableData, tableLoading } = this.props
    return (
      <div className="content-container">
        <div className="header">
          <div className="first-text">{title}</div>
          <div className="mt-20">
            <span className="second-text">分析时间：</span>
            <RangePicker 
              value={[startTime, endTime]}
              defaultValue={[startTime, endTime]} 
              onChange={ this.rangeChange.bind(this) }
            />
          </div>
        </div>
        <div className="content">
          <Card>
            { this.props.children }
          </Card>
          <div className="mt-20">
            <Card>
              <Button type="primary" className="download mb-20">下载</Button>
              <Table 
                dataSource={tableData.slice((page - 1) * pageSize, pageSize * page)}
                columns={tableColumns}
                loading={tableLoading}
                pagination={{
                  current: page,
                  pageSize: pageSize,
                  total: tableData.length,
                  onChange: this.tablePageChange.bind(this)
                }}
              />
            </Card>
          </div>
          
        </div>
      </div>
    )
  }
}