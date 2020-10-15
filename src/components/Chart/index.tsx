import React, { Fragment } from 'react'

const echarts = require('echarts') 

interface IProps {
  chartData: Array<any>
}

export default class Charts extends React.Component<IProps> {

  
  componentDidMount() {
    const { chartData } = this.props

    const myChart = echarts.init(document.getElementById('container'))
    
    // var data = [100, 200, 300, 400, 500, 600]

    // var time: Array<any> = ['2020-09-01', '2020-09-02','2020-09-03','2020-09-04','2020-09-05','2020-09-06']

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
          return `
            <div>
              <div>${params[0].axisValue}</div>
              <div>活跃人数：${params[0].dataIndex}</div>
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
        type: 'value',
        boundaryGap: false,
        min: 0,
        max: function (value: { max: string }) {
          return value.max
        }
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