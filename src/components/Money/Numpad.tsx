import React, {useState} from 'react';
import styled from 'styled-components';
import {Icon} from '../Icon';

const NumpadWrapper = styled.section`
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    .icon{
      width: 20px;
      height: 20px;
      vertical-align: -0.15em;
      fill: #4f4e4e;
      overflow: hidden;
    }
    .topWrapper{
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      width: 100vw;
      height:45px;
      font-size: 14px;
      .note{
        width: 60px;
        display: flex;
        align-items: center;
        font-size: inherit;
        white-space: nowrap;
      }
      > input {
        background-color: inherit;
        border:none;
        outline: none;
        height:100%;
        margin-left: 5px;
        font-size: 14px;
        &:nth-child(2){
          flex-grow: 1;
          max-width: 50%;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &:nth-child(3){
          font-size: 22px;
          text-align: right;
          width: 35%;
          padding-right: 8px;
        }
      }
    }
    .numberCounter{
          &::after{
            content:'';
            clear:both;
            display: block;
          }
        > button{
          float: left;
          box-sizing: border-box;
          border:.5px solid #d5d5d5;
          background-color: #f5f5f5;
          outline: none;
          width: 25%;   
          height:50px;  
          font-size: 20px;
          position: relative;
          &:active::before {
            display: block;
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 10%)
          }   
          &.yellowButton{
            float: right;
            background-color: #ffda44;
            height: 150px;
          }
        }
     }
`;

function Numpad() {
  const [account, setAccount] = useState('0');
  const changeAccount = (value: string) => {
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

return (
  <NumpadWrapper>
    <div className="topWrapper">
      <div className="note">
        <Icon name='remark'/>
        备注:
      </div>
      <input id='note' type="text" placeholder='写点什么吧'/>
      <input id='amount' type="text" disabled value={account}/>
    </div>

    <div className="numberCounter">
      <button onClick={() => {
        setAccount(changeAccount('7'));
      }}>7
      </button>
      <button onClick={() => {
        setAccount(changeAccount('8'));
      }}>8
      </button>
      <button onClick={() => {
        setAccount(changeAccount('9'));
      }}>9
      </button>
      <button onClick={() => {
        setAccount(changeAccount('clear'));
      }}>清除
      </button>
      <button onClick={() => {
        setAccount(changeAccount('4'));
      }}>4
      </button>
      <button onClick={() => {
        setAccount(changeAccount('5'));
      }}>5
      </button>
      <button onClick={() => {
        setAccount(changeAccount('6'));
      }}>6
      </button>
      <button className='yellowButton'>完成</button>
      <button onClick={() => {
        setAccount(changeAccount('1'));
      }}>1
      </button>
      <button onClick={() => {
        setAccount(changeAccount('2'));
      }}>2
      </button>
      <button onClick={() => {
        setAccount(changeAccount('3'));
      }}>3
      </button>

      <button onClick={() => {
        setAccount(changeAccount('.'));
      }}>.
      </button>
      <button onClick={() => {
        setAccount(changeAccount('0'));
      }}>0
      </button>
      <button onClick={() => {
        setAccount(changeAccount('delete'));
      }}><Icon name='delete'/></button>

    </div>
  </NumpadWrapper>
);
}

export {Numpad};