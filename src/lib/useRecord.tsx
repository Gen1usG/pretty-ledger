import {Record} from '../views/Money';
import {useState} from 'react';
import dayjs from 'dayjs';

type rebuildRecord = { date: string, records: Record[] }

// [{record1},{record2}]
function useRecord() {
  const [records, setRecords] = useState(JSON.parse(window.localStorage.getItem('records') || '[]'));
  console.log(records);
  const createRecord = (newRecord: Record) => {
    newRecord.createAt = new Date().toISOString();
    records.push(newRecord);
    setRecords(records);
    window.localStorage.setItem('records', JSON.stringify(records));
  };

  const rebuildRecords = () => {
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
    console.log(result);
    return result;
  };

  const chartsData = (timeRange: 'week' | 'month' | 'year', category: '-' | '+') => {
    if (timeRange === 'week') {
      const week = [];
      const weekData = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const tempDay = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
        week.push(tempDay);
        const tempRecords = records.filter((t:Record) => { return tempDay === dayjs(t.createAt).format('YYYY-MM-DD')})
        weekData.push(tempRecords)
      }
      console.log(week);
      console.log(weekData);
    }
  };
  chartsData('week', '-');
  return {records, createRecord, rebuildRecords};
}

export {useRecord};