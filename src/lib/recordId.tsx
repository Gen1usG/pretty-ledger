let id: number =  parseInt(window.localStorage.getItem('maxRecordId') || '0');

function recordId() {
  id++;
  window.localStorage.setItem('maxRecordId', JSON.stringify(id));
  return id;
}

export {recordId};