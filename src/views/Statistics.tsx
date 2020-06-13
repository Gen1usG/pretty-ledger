import React from 'react';
import {Layout} from '../components/Layout';
import styled from 'styled-components';
import {Icon} from '../components/Icon';

const StatisticsWrapper = styled.div`
    header{
      background-color: #ffda44;
      font-family: 幼圆,serif;
      font-size: 20px;
      text-align: center;
      padding: 8px 0;
    }
    .month{
      height:38px;
    }
    .icon{
      width: 14px;
      height: 14px;
      vertical-align: -0.15em;
      fill: #000;
      overflow: hidden;
    }
    .wrapper{
      background-color: #ffda44;
      display: flex;
      .title{
        font-size: 14px;
        color:#a7a7a7;
        height: 22px;
        line-height: 22px;
      }
      .title,.month,.total{
         padding-left: 10px;
      }
      .timePicker{
        width: 25%;
        .month{
            display: flex;
            align-items: center;
            width: 100%;
            > .textWrapper{
              border-right:1px solid black;
              width: 100%;
              height:30px;
              display: flex;
              > div:nth-child(1){
                font-size: 20px;
                line-height: 30px;
              }
              > div:nth-child(2){
                font-size: 14px;
               line-height: 32px;
              }
            }
        }
      }
      .totalWrapper{
        width: 75%;
        display: flex;
        .income,.expenditure{
          width: 100%;
          .textWrapper{
            display: flex;
            height:38px;
            align-items: center;
          }
        }
      }
    }
`;

const RecordsStage = styled.ul` 
  .dateNtotal{
    border-bottom: 1px solid rgba(167,167,167,.1);
    .day-income,.day-expenditure,.day-date{
      font-size: 12px;
      color:#a7a7a7;
    }
    display: flex;
    justify-content: space-between;
    padding:8px;
    .day-total{
      display: flex;
      > div{
        margin:0 5px;
      }
    }
  }
  .record-list{
    >li{
      display: flex;
      justify-content: space-between;
      align-items: center;  
      padding:10px;
    }
    .account{
      font-size: 14px;
    }
    .tagNameOrNote{
      display: flex;
      align-items: center;
      font-size: 14px;
      .iconWrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffda44;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        margin-right: 12px;
        .list-icon{
          width: 24px;
          height: 24px;
          vertical-align: -0.15em;
          fill: #343233;
          overflow: hidden;
        }
      }
    }   
  }
`;

function Statistics() {

  return (
    <Layout>
      <StatisticsWrapper>
        <header>笨蕉记账</header>
        <div className="wrapper">
          <div className="timePicker">
            <div className="title">2020</div>
            <div className="month">
              <div className="textWrapper">
                <div>06</div>
                <div>月 <Icon className='icon' name='down'/></div>
              </div>
            </div>
          </div>
          <div className="totalWrapper">
            <div className="income">
              <div className="title">收入</div>
              <div className="textWrapper">
                <div className="total">88.00</div>
              </div>
            </div>
            <div className="expenditure">
              <div className="title">支出</div>
              <div className="textWrapper">
                <div className="total">123.00</div>
              </div>
            </div>
          </div>
        </div>

        <RecordsStage>
          <li>
            <div className='dateNtotal'>
              <div className="day-date">06月09日 星期二</div>
              <div className="day-total">
                <div className="day-income">收入：88</div>
                <div className="day-expenditure">支出：123</div>
              </div>
            </div>
            <ul className='record-list'>
              <li>
                <div className="tagNameOrNote">
                  <div className="iconWrapper">
                    <Icon name='salary' className='list-icon'/>
                  </div>
                  工资
                </div>
                <div className="account">88</div>
              </li>
            </ul>
          </li>
        </RecordsStage>
      </StatisticsWrapper>
    </Layout>
  );
}

export {Statistics};