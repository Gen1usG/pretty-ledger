import {Record} from '../views/Money';

// [{record1},{record2}]
function useRecord() {
  const getRecord = () => {
    return JSON.parse(window.localStorage.getItem('records') || '[]');
  };
  const createRecord = (newRecord: Record) => {
    const record = getRecord();
    record.push(newRecord);
    window.localStorage.setItem('records', JSON.stringify(record));
  };

  return {getRecord, createRecord};
}

export {useRecord};