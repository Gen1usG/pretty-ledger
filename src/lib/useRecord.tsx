import {Record} from '../views/Money';
import {useState} from 'react';

// [{record1},{record2}]
function useRecord() {
  const [records, setRecords] = useState(JSON.parse(window.localStorage.getItem('records') || '[]'));

  const createRecord = (newRecord: Record) => {
    newRecord.createAt = new Date().toISOString();
    records.push(newRecord);
    setRecords(records);
    window.localStorage.setItem('records', JSON.stringify(records));
  };

  return {records, createRecord};
}

export {useRecord};