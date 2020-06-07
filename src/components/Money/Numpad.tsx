import React from 'react';
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
          font-size: 20px;
          text-align: right;
          width: 35%;
          padding-right: 8px;
        }
      }
    }
    .numberCounter{
        display: flex;
        flex-wrap: wrap;
        > button{
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
        }
     }
    
`;

function Numpad() {
  return (
    <NumpadWrapper>
      <div className="topWrapper">
        <div className="note">
          <Icon name='remark'/>
          备注:
        </div>
        <input type="text" placeholder='写点什么吧'/>
        <input type="text"/>
      </div>

      <div className="numberCounter">
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>清除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button><Icon name='delete'/></button>
        <button>完成</button>
      </div>
    </NumpadWrapper>
  );
}

export {Numpad};