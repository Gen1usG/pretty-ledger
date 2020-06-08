import React, {useState} from 'react';
import styled from 'styled-components';
import {Icon} from '../Icon';
import {changeAccount} from '../../lib/changeAccount';

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
  const inputValue = (value: string) => {
    return changeAccount(value,account)
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
      <button className='yellowButton'>完成</button>
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