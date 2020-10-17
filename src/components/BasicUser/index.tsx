import React from 'react';

import { DatePicker, Card, Tabs, Table, Button, message } from 'antd';
import moment from 'moment';
import reducer from '@/store/reducers';
import Charts from '@/components/Chart';
import { DATE_FORMAT } from '@/constants/date';

import './index.less';

const { RangePicker } = DatePicker;

const { TabPane } = Tabs;

interface IProps {
  title: string;
  tableColumns: Array<object>;
  tableData: Array<object>;
  tableLoading?: boolean;
  tabsMenu: Array<object>;
  tabPaneMenu: Array<any>;
  callback: any;
}

export default class BasicUser extends React.Component<IProps> {
  state = {
    vistorData: [],
    startTime: moment(),
    endTime: moment().add(7, 'days'),
    page: 1,
    pageSize: 10,
    dimension: '1',
    tabKey: 'active-trend',
  };

  rangeChange(value: string) {
    if (value === null) {
      message.error('请选择一个时间范围');
      return;
    }
    const { startTime, endTime } = this.state;
    this.props.callback(
      {
        startTime: startTime.format(DATE_FORMAT),
        endTime: endTime.format(DATE_FORMAT),
      },
      true
    );
  }

  changeTab(activeKey: string) {
    this.props.callback({ dimension: '1' }, false);
    this.setState({ tabKey: activeKey, dimension: '1' });
  }

  changeWeekTab(activeKey: string) {
    this.props.callback({ dimension: activeKey }, true);
    this.setState({ dimension: activeKey });
  }

  tablePageChange(page: number) {
    this.setState({ page });
  }

  render() {
    const {
      startTime,
      endTime,
      page,
      pageSize,
      tabKey,
      dimension,
    } = this.state;
    const {
      title,
      tableColumns,
      tableData,
      tableLoading,
      tabsMenu,
      tabPaneMenu,
    } = this.props;
    return (
      <div className="content-container">
        <div className="header">
          <div className="first-text">{title}</div>
          <div className="mt-20">
            <span className="second-text">分析时间：</span>
            <RangePicker
              value={[startTime, endTime]}
              defaultValue={[startTime, endTime]}
              onChange={this.rangeChange.bind(this)}
            />
          </div>
        </div>
        <div className="content">
          <Card>
            {/* { this.props.children } */}
            <Tabs activeKey={tabKey} onChange={this.changeTab.bind(this)}>
              {tabsMenu.map((tabs: any) => {
                return (
                  <TabPane tab={tabs.tab} key={tabs.key}>
                    <Tabs
                      activeKey={dimension}
                      onChange={this.changeWeekTab.bind(this)}
                    >
                      {tabPaneMenu.map((el: any, index) => {
                        return (
                          <TabPane tab={el} key={index + 1}>
                            {tabs.data.length &&
                              dimension === String(index + 1) &&
                              tabKey === tabs.key && (
                                <Charts chartData={tabs.data}></Charts>
                              )}
                          </TabPane>
                        );
                      })}
                    </Tabs>
                  </TabPane>
                );
              })}
            </Tabs>
          </Card>
          <div className="mt-20">
            <Card>
              <Button type="primary" className="download mb-20">
                下载
              </Button>
              <Table
                dataSource={tableData.slice(
                  (page - 1) * pageSize,
                  pageSize * page
                )}
                columns={tableColumns}
                loading={tableLoading}
                pagination={{
                  current: page,
                  pageSize: pageSize,
                  total: tableData.length,
                  onChange: this.tablePageChange.bind(this),
                }}
              />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
