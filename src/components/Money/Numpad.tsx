import React, {useEffect, useRef, useState} from 'react';
import {Icon} from '../Icon';
import {changeAccount} from '../../lib/changeAccount';
import {NumpadWrapper} from '../styledComponent/NumpadWrapper';
import {Record} from '../../views/Money';

type Props = {
  note: string;
  account: number;
  onChange: (value: Partial<Record>) => void
  onSubmit: () => void
}


function Numpad(props: Props) {
  const [account, setAccount] = useState(props.account.toString());
  const inputValue = (value: string) => {
    const newAccount = changeAccount(value, account);
    props.onChange({account: parseFloat(newAccount)});
    return newAccount;
  };

  const noteInput: any = useRef(null);

  useEffect(() => {
    setAccount(props.account.toString());
  }, [setAccount, props.account]);

  useEffect(() => {
    if(props.note===''){
      noteInput.current.value = props.note
    }
  }, [ props.note]);

  const okSubmit = () => {
    props.onSubmit();
  };

  return (
    <NumpadWrapper>
      <div className="topWrapper">
        <div className="note">
          <Icon name='remark'/>
          备注:
        </div>
        <input id='note' type="text" placeholder='写点什么吧'
               defaultValue={props.note}
               onBlur={(e) => {
                 props.onChange({note: e.target.value});
               }}
               ref={noteInput}
        />
        <input id='amount' type="text" disabled value={account}/>
      </div>

      <div className="numberCounter">
        <button onClick={() => {
          setAccount(inputValue('7'));
        }}>7
        </button>
        <button onClick={() => {
          setAccount(inputValue('8'));
        }}>8
        </button>
        <button onClick={() => {
          setAccount(inputValue('9'));
        }}>9
        </button>
        <button onClick={() => {
          setAccount(inputValue('clear'));
        }}>清除
        </button>
        <button onClick={() => {
          setAccount(inputValue('4'));
        }}>4
        </button>
        <button onClick={() => {
          setAccount(inputValue('5'));
        }}>5
        </button>
        <button onClick={() => {
          setAccount(inputValue('6'));
        }}>6
        </button>
        <button className='yellowButton' onClick={okSubmit}>完成</button>
        <button onClick={() => {
          setAccount(inputValue('1'));
        }}>1
        </button>
        <button onClick={() => {
          setAccount(inputValue('2'));
        }}>2
        </button>
        <button onClick={() => {
          setAccount(inputValue('3'));
        }}>3
        </button>

        <button onClick={() => {
          setAccount(inputValue('.'));
        }}>.
        </button>
        <button onClick={() => {
          setAccount(inputValue('0'));
        }}>0
        </button>
        <button onClick={() => {
          setAccount(inputValue('delete'));
        }}><Icon name='delete'/></button>

      </div>
    </NumpadWrapper>
  );
}

export {Numpad};