const changeAccount = (value: string,account:string) => {
  switch (value) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if(account.length>=10){
        return account
      }
      if (account === '0') {
        return value;
      } else {
        return account + value;
      }
    case '.':
      if (account.indexOf('.') >= 0) {
        return account;
      }
      return account + '.';
    case 'delete':
      if (account.length === 1) {
        return '0';
      } else {
        return account.slice(0, -1) || '';
      }
    case 'clear':
      return '0';
    default:
      return '';
  }
};

export {changeAccount}