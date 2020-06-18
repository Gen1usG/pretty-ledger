import React, {useEffect, useRef, useState} from 'react';
import {Layout} from '../components/Layout';
import styled from 'styled-components';
import {CategoryBar} from '../components/CategoryBar';
import {Icon} from '../components/Icon';
import classNames from 'classnames';
import echarts from 'echarts';

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
   #main-charts{
      width: 100%;
      height:200px;
   }
`;

function Charts() {
  const [category, setCategory] = useState<'-' | '+'>('-');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [chartsOption, setChartsOption] = useState<object>({
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  });
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
        <div id='main-charts'/>
        <div className="rank"></div>
      </ChartsWrapper>
    </Layout>
  );
}

export {Charts};