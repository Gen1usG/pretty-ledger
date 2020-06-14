import {Record} from '../views/Money';
import {useState} from 'react';
import dayjs from 'dayjs';

// [{record1},{record2}]
function useRecord() {
  const [records, setRecords] = useState(JSON.parse(window.localStorage.getItem('records') || '[]'));

  const createRecord = (newRecord: Record) => {
    newRecord.createAt = new Date().toISOString();
    records.push(newRecord);
    setRecords(records);
    window.localStorage.setItem('records', JSON.stringify(records));
  };

  const rebuildRecords = () => {
    const result: ({ [K: string]: any }) = {};
    for (let i = 0; i < records.length; i++) {
      const tempYear = dayjs(records[i].createAt).format('YYYY') as string;
      const tempMonth = dayjs(records[i].createAt).format('MM') as string;
      if (result[tempYear] === undefined) {
        result[tempYear] = {};
        result[tempYear][tempMonth] = [records[i]];
      }else if(result[tempYear]){
        if(result[tempYear][tempMonth]===undefined){
          result[tempYear][tempMonth] = [records[i]]
        }else{
          result[tempYear][tempMonth].push(records[i])
        }
      }
    }
    return result
  };

  return {records, createRecord, rebuildRecords};
}

export {useRecord};