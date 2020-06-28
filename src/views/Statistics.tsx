import React, {useEffect, useRef, useState} from 'react';
import {Layout} from '../components/Layout';
import {Icon} from '../components/Icon';
import {useRecord} from '../lib/useRecord';
import dayjs from 'dayjs';
import {DatePicker} from '../components/DatePicker';
import {Record} from './Money';
import {BeautyIcon} from '../components/BeautyIcon';
import {NoData} from '../components/NoData';
import {RecordsStage, StatisticsWrapper} from '../components/styledComponent/StatisticsWrapper';
import {Link} from 'react-router-dom';

function Statistics() {
  const {rebuildRecords} = useRecord();
  const [staRecords] = useState(rebuildRecords);
  const [selectedDate, setSelectedDate] = useState<{ year: string, month: string }>({
    year: dayjs(new Date()).format('YYYY'),
    month: dayjs(new Date()).format('MM')
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const onSelectedDateChange = (newDate: { year: string, month: string }) => {
    setSelectedDate(newDate);
    setShowDatePicker(false);
  };
  const dayHash: { [K: string]: string } = {
    '0': '星期天',
    '1': '星期一',
    '2': '星期二',
    '3': '星期三',
    '4': '星期四',
    '5': '星期五',
    '6': '星期六',
  };
  const countAccount = (tags: any[], category: '-' | '+') => {
    let sum = 0;
    if (!tags) {
      return;
    }
    if (tags[0] && tags[0].tag) {
      tags.filter(t => t.category === category).forEach(i => {
        sum += i.account;
      });
    } else if (tags[0] && tags[0].records) {
      const tempArr: Record[] = [];
      tags.forEach(item => {
        const categoryArr = item.records.filter((t: Record) => t.category === category);
        categoryArr.forEach((r: Record) => {
          tempArr.length === 0 ? tempArr[0] = r : tempArr.splice(tempArr.length - 1, 0, r);
        });
      });

      tempArr.forEach(i => {
        sum += i.account;
      });
    }
    return sum.toFixed(2);
  };
  const refUl = useRef<any>(null);

  useEffect(() => {
    const resize  = ()=>{refUl.current.style.height = (document.body.clientHeight - 38 - 60 - 57) + 'px'};
    window.onresize = resize;
    return (()=>{
      window.removeEventListener('resize', resize);
    })
  }, []);

  return (
    <Layout>
      <StatisticsWrapper>
        <header>笨蕉记账</header>
        <div className="wrapper">
          <div className="timePicker" onClick={() => {
            setShowDatePicker(true);
          }}>
            <div className="title">{selectedDate.year}</div>
            <div className="month">
              <div className="textWrapper">
                <div>{selectedDate.month}</div>
                <div>月 <Icon className='icon' name='down'/></div>
              </div>
            </div>
          </div>
          <div className="totalWrapper">
            <div className="income">
              <div className="title">收入</div>
              <div className="textWrapper">
                <div className="total">{countAccount(staRecords[selectedDate.year][selectedDate.month], '+')}</div>
              </div>
            </div>
            <div className="expenditure">
              <div className="title">支出</div>
              <div className="textWrapper">
                <div className="total">{countAccount(staRecords[selectedDate.year][selectedDate.month], '-')}</div>
              </div>
            </div>
          </div>
        </div>

        <RecordsStage ref={refUl}>
          <NoData show={staRecords[selectedDate.year][selectedDate.month].length === 0}/>
          {staRecords && staRecords[selectedDate.year][selectedDate.month].map((item: { date: string, records: Record[] }) => {
            return (
              <li key={item.date}>

                <div className='dateNtotal'>
                  <div
                    className="day-date">{dayjs(item.date).format('MM')}月{dayjs(item.date).format('DD')}日 {dayHash[dayjs(item.date).format('d')]}</div>
                  <div className="day-total">
                    <div className="day-income">收入：{countAccount(item.records, '+')}</div>
                    <div className="day-expenditure">支出：{countAccount(item.records, '-')}</div>
                  </div>
                </div>
                <ul className='record-list'>
                  {item.records.map((listItem: Record) => {
                    return (
                      <li key={listItem.createAt}>
                        <Link to={`/editTag/${listItem.id}`}>
                          <div className="tagNameOrNote">
                            <BeautyIcon name={listItem.tag.name!} className='beautyIcon'/>
                            {listItem.note === '' ? listItem.tag.tagName : listItem.note}
                          </div>
                          <div className="account">{listItem.category === '+' ? '' : '-'}{listItem.account}</div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

              </li>
            );
          })}

        </RecordsStage>
        <DatePicker selectedDate={selectedDate}
                    onSelectedDateChange={onSelectedDateChange}
                    showDatePicker={showDatePicker}/>
      </StatisticsWrapper>
    </Layout>
  );
}

export {Statistics};