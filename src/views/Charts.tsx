import React, {useEffect, useRef, useState} from 'react';
import {Layout} from '../components/Layout';
import styled from 'styled-components';
import {CategoryBar} from '../components/CategoryBar';
import {Icon} from '../components/Icon';
import classNames from 'classnames';
import echarts from 'echarts';
import {useRecord} from '../lib/useRecord';
import {Record} from './Money';

const ChartsWrapper = styled.div`
    %iconComment{
      vertical-align: -0.15em;
      overflow: hidden;
   }
   .icon{
      width: 14px;
      height: 14px;
      vertical-align: 0;
      fill: #000;
      overflow: hidden;
   }
   .top-bar{
      background-color: #ffda44;
      display: flex;
      flex-direction: column;
      align-items: center;
      .category{
        padding:5px 0;
        font-size: 18px;
      }
      .categoryBar{
        width: 90%;
        margin:5px 0 10px 0;
      }
      .category-selector-wrapper{
        display: none;
        width: 100%;       
        height:100%;
        background-color: rgba(0,0,0,.5);
        position: fixed;
        top:74px;
        z-index: 100;
        .category-selector{
          background-color: #fff;
          > li{
            .left-icon{
              @extend %iconCommon;
              width: 20px;
              height: 20px;
              fill: #ffda44;
              margin:0 8px;
            }
            .right-icon{
              display: none;
              @extend %iconCommon;
              width: 20px;
              height: 20px;
              color: #334444;
              margin-right: 15px;
            }
            .show-right-icon{
              display: block;
            }
            display: flex;
            align-items: center;
            > div{
              flex-grow: 1;
              display: flex;
              justify-content: space-between;
              padding: 10px 0 ;
              border-bottom: 1px solid rgba(0,0,0,.2);
            }
          }
        }
      }
   }
   .charts-wrapper{
      #main-charts{
        margin:0;
        width: 100%;
        height:180px;
      }
      .charts-time{
        border-bottom:1px solid rgba(0,0,0,.2);
        padding:8px;
        > span{
          font-size: 14px;
        }
      }
   }
   
`;

function Charts() {
  const {chartsData} = useRecord();
  const [category, setCategory] = useState<'-' | '+'>('-');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [chartsOption, setChartsOption] = useState<object>({
    title: {
      text: '总支出：',
      textStyle: {
        color: '#aaa',
        fontWeight: 'normal',
        fontSize: 12,
      },
      subtext: '平均值：',
      subtextStyle: {
        fontSize: 10,
      }
    },
    grid: {
      top: '20%',
      bottom: '20%'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisTick: {show: false},
      data: [0]
    },
    yAxis: {
      axisLabel: {
        show: false,
      },
      splitLine: {show: false},
      axisLine: {show: false},
      axisTick: {show: false},
      type: 'value',
    },
    series: [{
      symbol: 'circle',
      symbolSize: 6,
      itemStyle: {
        borderColor: '#334444',
        color: (params: { value: number }) => params.value === 0 ? '#fff' : '#ffda44',
      },
      lineStyle: {
        width: 1,
        color: '#334444',
      },
      markLine: {
        symbol: 'none',
        label: {show: false},
        lineStyle: {color: 'rgba(51,68,68,.3)'},
        silent:true,
        data: [
          {type: 'average', name: '平均值'}, {type: 'max', name: '最大值', lineStyle: {type: 'solid'}}
        ]

      },
      data: [0],
      type: 'line'
    }]
  });
  useEffect(() => {
    const dataObj = chartsData(timeRange, category);
    const dataAccount: number[] = [];
    if (dataObj) {
      dataObj.dateData.forEach((dataList: Record[]) => {
        dataAccount.push(dataList.reduce((sum: number, current: Record) => {
          return sum += current.account;
        }, 0));
      });
    }
    setChartsOption({
      xAxis:{
        data:dataObj!.date
      },
      series:[{
        data:dataAccount
      }]
    })
  }, [category, timeRange]);
  const refCategorySelectorWrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('main-charts') as HTMLDivElement);
    myChart.setOption(chartsOption);
  }, [chartsOption]);
  const showSelector = () => {
    refCategorySelectorWrapper.current!.style.display = 'block';
  };
  const toggleCategory = (category: '-' | '+') => {
    setCategory(category);
    refCategorySelectorWrapper.current!.style.display = 'none';
  };
  const changeTimeRange = (timeRange: 'week' | 'month' | 'year') => {
    setTimeRange(timeRange);
  };
  const timeRangeText = (timeRange: 'week' | 'month' | 'year') => {
    return {
      'week': '近七天',
      'month': '本月',
      'year': '今年',
    }[timeRange];
  };
  const incomeAndExpenditure = [
    {category: '-', name: '支出', iconName: 'expenditure'},
    {category: '+', name: '收入', iconName: 'income'}];

  return (
    <Layout>
      <ChartsWrapper>
        <div className="top-bar">
          <div className="category" onClick={showSelector}>{category === '-' ? "支出" : "收入"} <Icon name='down'/></div>
          <CategoryBar categoryList={['week', 'month', 'year']}
                       category={timeRange} className={'categoryBar'}
                       changeTimeRange={changeTimeRange}/>
          <div className="category-selector-wrapper" ref={refCategorySelectorWrapper}>
            <ul className="category-selector">{
              incomeAndExpenditure.map((c) => {
                return (
                  <li key={c.name} onClick={() => {
                    toggleCategory(c.category as '-' | '+');
                  }}>
                    <Icon name={c.iconName} className='left-icon'/>
                    <div>
                      <div>{c.name}</div>
                      <Icon name='tick'
                            className={classNames('right-icon', category === c.category ? 'show-right-icon' : '')}/>
                    </div>
                  </li>
                );
              })
            }</ul>
          </div>
        </div>
        <div className="charts-wrapper">
          <div className="charts-time"><span>{timeRangeText(timeRange)}</span></div>
          <div id='main-charts'/>
        </div>

        <div className="rank"></div>
      </ChartsWrapper>
    </Layout>
  );
}

export {Charts};