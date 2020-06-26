import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Layout} from '../components/Layout';
import {CategoryBar} from '../components/CategoryBar';
import {Icon} from '../components/Icon';
import classNames from 'classnames';
import echarts from 'echarts';
import {useRecord} from '../lib/useRecord';
import {Record} from './Money';
import {BeautyIcon} from '../components/BeautyIcon';
import {ChartsWrapper} from '../components/styledComponent/ChartsWrapper';
import {RankBar} from '../components/RankBar';
import {NoData} from '../components/NoData';

function Charts() {
  const [category, setCategory] = useState<'-' | '+'>('-');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const {chartsDataObj} = useRecord(timeRange, category);
  const [dataObj, setDataObj] = useState(chartsDataObj);
  useEffect(() => {
    setDataObj(chartsDataObj);
  }, [timeRange, category, chartsDataObj]);
  const chartsSeriesData = useMemo(() => {
    const dataAccount: number[] = [];
    let total: number = 0;
    if (dataObj) {
      dataObj.dateData.forEach((dataList: Record[]) => {
        dataAccount.push(dataList.reduce((sum: number, current: Record) => {
          total += current.account;
          return total;
        }, 0));
      });
    }

    const totalText = category === '-' ? `总支出：${total.toFixed(2)}` : `总收入：${total.toFixed(2)}`;
    const average = (total / dataObj!.date.length).toFixed(2);
    return {dataAccount, total, totalText, average};
  }, [dataObj, category]);

  const [chartsOption, setChartsOption] = useState<object>({
    title: {
      text: chartsSeriesData.totalText,
      textStyle: {
        color: '#aaa',
        fontWeight: 'normal',
        fontSize: 12,
      },
      subtext: `平均值：${chartsSeriesData.average}`,
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
      data: dataObj!.date
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
        silent: true,
        data: [
          {type: 'average', name: '平均值'}, {type: 'max', name: '最大值', lineStyle: {type: 'solid'}}
        ]

      },
      data: chartsSeriesData.dataAccount,
      type: 'line'
    }]
  });
  useEffect(() => {
    setChartsOption({
      title: {
        text: chartsSeriesData.totalText,
        subtext: `平均值：${chartsSeriesData.average}`,
      },
      xAxis: {
        data: dataObj!.date
      },
      series: [{
        data: chartsSeriesData.dataAccount
      }]
    });
  }, [dataObj, chartsSeriesData.totalText, chartsSeriesData.dataAccount, chartsSeriesData.average]);
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
  const rankCategoryText = (category: '-' | '+') => {
    return category === '-' ? '支出排行榜' : '收入排行榜';
  };
  const incomeAndExpenditure = [
    {category: '-', name: '支出', iconName: 'expenditure'},
    {category: '+', name: '收入', iconName: 'income'}];

  const rankData = useMemo(() => {
    const data = dataObj;
    const categoryObj: { [K: string]: { tag: string, total: number, tagName: string } } = {};
    const resultArr = [];
    if (data) {
      for (let i = 0; i < data.dateData.length; i++) {
        data.dateData[i].forEach((r: Record) => {
          if (!categoryObj[r.tag.tagName!]) {
            categoryObj[r.tag.tagName!] = {tag: '', total: 0, tagName: ''};
            categoryObj[r.tag.tagName!].tag = r.tag.name as string;
            categoryObj[r.tag.tagName!].total = r.account;
            categoryObj[r.tag.tagName!].tagName = r.tag.tagName as string;
          } else {
            categoryObj[r.tag.tagName!].total += r.account;
          }
        });
      }
    }
    for (let key in categoryObj) {
      resultArr.push(categoryObj[key]);
    }
    resultArr.sort((a, b) => {
      return b.total - a.total;
    });
    return resultArr;
  }, [dataObj]);
  const rankRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    rankRef.current!.style.height = (document.body.clientHeight - 388) + 'px';
  }, []);

  const showNoData = () => {
    if (!dataObj) return true;
    let show = true;
    dataObj.dateData.forEach(item=>{
      if(item.length!==0) show = false;
    });
    return show
  };

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

        <div className="rank">
          <div className="rankCategory"><span>{rankCategoryText(category)}</span></div>
          <ul className='rankList' ref={rankRef}>
            <NoData show={showNoData()}/>
            {rankData.map((d: { tag: string, total: number, tagName: string }) => {
              return (
                <li key={d.tagName}>
                  <BeautyIcon name={d.tag} className='beautyIcon'/>
                  <div className="rank-description-wrapper">
                    <div className="rank-title">
                      <div className="rank-left"><span>{d.tagName}&nbsp;</span>
                        <span>{((d.total / chartsSeriesData.total) * 100).toFixed(1) + '%'}</span></div>
                      <div className="rank-right">{d.total.toFixed(2)}</div>
                    </div>
                    <RankBar barWidth={(d.total / rankData[0].total) * 100}/>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </ChartsWrapper>
    </Layout>
  );
}

export {Charts};