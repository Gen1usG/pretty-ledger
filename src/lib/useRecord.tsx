import {Record} from '../views/Money';
import {useCallback, useEffect, useState} from 'react';
import dayjs from 'dayjs';

type rebuildRecord = { date: string, records: Record[] }

// [{record1},{record2}]
function useRecord(timeRanges?: 'week' | 'month' | 'year', category?: '-' | '+') {
  const [records, setRecords] = useState(JSON.parse(window.localStorage.getItem('records') || '[]'));
  const createRecord = (newRecord: Record) => {
    newRecord.createAt = new Date().toISOString();
    records.push(newRecord);
    setRecords(records);
    window.localStorage.setItem('records', JSON.stringify(records));
  };

  const rebuild = () => {
    const result: ({ [K: string]: any }) = {[dayjs(new Date()).format('YYYY')]: {[dayjs(new Date()).format('MM')]: []}};
    for (let i = 0; i < records.length; i++) {
      const tempYear = dayjs(records[i].createAt).format('YYYY') as string;
      const tempMonth = dayjs(records[i].createAt).format('MM') as string;
      const tempDay = dayjs(records[i].createAt).format('YYYY-MM-DD') as string;
      if (result[tempYear] === undefined) {
        result[tempYear] = {};
        result[tempYear][tempMonth] = [{date: tempDay, records: [records[i]]}];
      } else if (result[tempYear]) {
        if (result[tempYear][tempMonth] === undefined) {
          result[tempYear][tempMonth] = [{date: tempDay, records: [records[i]]}];
        } else if (result[tempYear][tempMonth]) {
          if (result[tempYear][tempMonth].filter((item: rebuildRecord) => item.date === tempDay).length === 0) {
            result[tempYear][tempMonth].push({date: tempDay, records: [records[i]]});
          } else {
            result[tempYear][tempMonth].filter((item: rebuildRecord) => item.date === tempDay)[0].records.push(records[i]);
          }
        }
      }
      result[tempYear][tempMonth].sort((a: rebuildRecord, b: rebuildRecord) => {
        return -(parseFloat(dayjs(a.date).format('DD')) - parseFloat(dayjs(b.date).format('DD')));
      });
    }
    return result;
  };
  const [rebuildRecords] = useState(rebuild());

  const chartsData = (timeRange: 'week' | 'month' | 'year', category: '-' | '+') => {
    if (timeRange === 'week') {
      const week = [];
      const weekData = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const tempDay = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
        week.push(dayjs(tempDay).format('MM-DD'));
        const tempRecords = records.filter((t: Record) => {
          return tempDay === dayjs(t.createAt).format('YYYY-MM-DD') && category === t.category;
        });
        weekData.push(tempRecords);
      }
      return {'date': week, 'dateData': weekData};
    }
    if (timeRange === 'month') {
      const daysInMonth = dayjs(new Date()).daysInMonth();
      const eachDayInMonth = [];
      const eachDayData = [];
      for (let i = 1; i <= daysInMonth; i++) {
        const tempDay = dayjs(new Date()).date(i).format('YYYY-MM-DD');
        eachDayInMonth.push(dayjs(tempDay).format('DD'));
        const tempRecords = records.filter((t: Record) => {
          return tempDay === dayjs(t.createAt).format('YYYY-MM-DD') && category === t.category;
        });
        eachDayData.push(tempRecords);
      }
      return {'date': eachDayInMonth, 'dateData': eachDayData};
    }
    if (timeRange === 'year') {
      const year = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
      const yearData = [];
      for (let i = 1; i <= 12; i++) {
        const tempMonth = dayjs(new Date()).month(i - 1).format('YYYY-MM');
        const tempRecords = records.filter((t: Record) => {
          return tempMonth === dayjs(t.createAt).format('YYYY-MM') && category === t.category;
        });
        yearData.push(tempRecords);
      }
      return {'date': year, 'dateData': yearData};
    }
  };
  const [chartsDataObj, setChartsDataObj] = useState(chartsData(timeRanges!, category!));
  const chartsDataCB = useCallback(chartsData, []);
  useEffect(() => {
    setChartsDataObj(() => chartsDataCB(timeRanges!, category!));
  }, [timeRanges, category, chartsDataCB]);




  return {records, createRecord, rebuildRecords, chartsDataObj}
}

export {useRecord};