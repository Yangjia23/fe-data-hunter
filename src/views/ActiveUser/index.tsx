import React from 'react';

import { connect } from 'react-redux';

import BasicUser from '@/components/BasicUser';
import moment from 'moment';
import { getVistorData } from '@/api/user';
import { DATE_FORMAT } from '@/constants/date';

import './index.less';

const mapStateToProps = ({ desktop: { products } }: any) => ({
  products,
});

interface IProps extends ReturnType<typeof mapStateToProps> {}

class ActiveUser extends React.Component<IProps> {
  state = {
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
        dataIndex: 'perctActiveRegularCount',
        key: 'perctActiveRegularCount',
      },
      {
        title: '试用用户组活跃',
        dataIndex: 'activeProbationCount',
        key: 'activeProbationCount',
      },
      {
        title: '试用用户活跃构成（新用户占比）',
        dataIndex: 'perctActiveProbationCount',
        key: 'perctActiveProbationCount',
      },
    ],
    tableData: [],
    tableLoading: true,
    activeTrendData: [],
    activeFormData: [],
    startTime: moment().format(DATE_FORMAT),
    endTime: moment().add(7, 'days').format(DATE_FORMAT),
    dimension: '1',
    tabKey: 'active-trend',
  };

  componentDidMount() {
    this.getUserData();
  }

  callback(value: object, getNewData: boolean) {
    const that = this;
    console.log('views callback >>>', { ...value });
    this.setState({ ...value }, function () {
      getNewData && that.getUserData();
    });
  }

  formatNumber(value1: string, value2: string): string {
    const num: any = Number(value1) / Number(value2);
    return `${num.toFixed(4) * 100}%`;
  }

  getUserData() {
    const data = require('../../mock/getVistorData.js');
    Promise.resolve(data).then((res) => {
      const list = res.data.list;
      const nRC = 'newRegularCount'; // 新增正式用户组
      const nPC = 'newProbationCount'; // 新增试用用户组
      const aRC = 'activeRegularCount'; // 活跃正式用户组
      const aPC = 'activeProbationCount'; // 活跃试用用户组
      const allData = list.map((el: any, index: number) => ({
        ...el,
        key: index + 1,
        perctActiveRegularCount: this.formatNumber(el[nRC], el[aRC]),
        perctActiveProbationCount: this.formatNumber(el[nPC], el[aPC]),
      }));
      const activeFormData = [
        list.map((el: any) => el.time),
        list.map((el: any) => {
          const newTotal = Number(el[nRC]) + Number(el[nPC]);
          const activeTotal = Number(el[aRC]) + Number(el[aPC]);
          const perct: any = newTotal / activeTotal;
          return perct.toFixed(4);
        }),
      ];

      const activeTrendData: Array<string> = [
        list.map((el: any) => el.time),
        list.map((el: any) => String(Number(el[aRC]) + Number(el[aPC]))),
      ];
      this.setState({
        tableLoading: false,
        tableData: allData,
        activeTrendData,
        activeFormData,
      });
    });

    const { startTime, endTime, dimension } = this.state;
    console.log('getVistorData >>>', startTime, endTime, dimension);
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

  render() {
    const {
      tableColumns,
      tableData,
      tableLoading,
      activeTrendData,
      activeFormData,
      dimension,
      tabKey,
    } = this.state;
    const tabsMenu = [
      { tab: '活跃趋势', key: 'active-trend', data: activeTrendData },
      { tab: '活跃趋势', key: 'active-form', data: activeFormData },
    ];
    const tabPaneMenu = ['日活跃', '周活跃', '月活跃'];
    return (
      <>
        <BasicUser
          ref="basicUser"
          title="活跃用户分析"
          tableColumns={tableColumns}
          tableData={tableData}
          tableLoading={tableLoading}
          tabsMenu={tabsMenu}
          tabPaneMenu={tabPaneMenu}
          callback={this.callback.bind(this)}
        />
      </>
    );
  }
}

export default connect(mapStateToProps)(ActiveUser);
