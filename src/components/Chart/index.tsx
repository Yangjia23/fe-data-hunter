import React, { Fragment } from 'react'

const echarts = require('echarts') 

interface IProps {
  chartData: Array<any>
}

export default class Charts extends React.Component<IProps> {
  componentDidMount() {
    const { chartData } = this.props
    const myChart = echarts.init(document.getElementById('container'))

    myChart.setOption({
      grid: {
        top: 10,
        left: '5%',
        right: '5%',
        borderColor: '#E5E5E5',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params: Array<any>) => {
          const { axisValue, data } = params[0]
          return `
            <div>
              <div>${axisValue}</div>
              <div>${data > 0 && data < 1 ? '活跃人数占比：' + (data * 100).toFixed(2) + '%' : '活跃人数：' + data}</div>
            </div>
          `
        },
        position: function (pt: Array<any>) {
          return [pt[0], '10%'];
        }
      },
      xAxis: {
        type: 'category',
        nameTextStyle: {
          align: 'center',
        },
        boundaryGap: false,
        data: chartData[0] || [],
      },
      yAxis: {
        axisLabel: {
          formatter: function (val: any) {
            return val > 0 && val < 1 ? val * 100 + '%' : val
          }
        },
      },
      dataZoom: [{
          type: 'inside',
          start: 0,
          end: 100
      }, {
          start: 0,
          end: 100,
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
      }],
      series: [
        {
          type: 'line',
          itemStyle: {
            color: 'rgb(72, 208, 2001)'
          },
          data: chartData[1] || []
        }
      ]
    })
  }

  render () {
    return (
      <Fragment>
        <div id="container" style={{ height: '250px' }}></div>
      </Fragment>
    )
  }
}