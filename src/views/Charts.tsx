import React from 'react';
import {Layout} from '../components/Layout';
import styled from 'styled-components';
import {CategoryBar} from '../components/CategoryBar';
import {Icon} from '../components/Icon';

const ChartsWrapper = styled.div`
    %iconComment{
      vertical-align: -0.15em;
      overflow: hidden;
   }
   .icon{
      width: 14px;
      height: 14px;
      vertical-align: 0;
      fill: #000;
      overflow: hidden;
   }
   .top-bar{
      background-color: #ffda44;
      display: flex;
      flex-direction: column;
      align-items: center;
      .category{
        padding:5px 0;
        font-size: 18px;
      }
      .categoryBar{
        width: 90%;
        margin:5px 0 10px 0;
      }
      .category-selector-wrapper{
        width: 100%;       
        height:100%;
        background-color: rgba(0,0,0,.5);
        position: fixed;
        top:74px;
        .category-selector{
          background-color: #fff;
          > li{
            .left-icon{
              @extend %iconCommon;
              width: 20px;
              height: 20px;
              fill: #ffda44;
              margin:0 8px;
            }
            .right-icon{
              display: block;
              @extend %iconCommon;
              width: 20px;
              height: 20px;
              color: #334444;
              margin-right: 15px;
            }
            display: flex;
            align-items: center;
            > div{
              flex-grow: 1;
              display: flex;
              justify-content: space-between;
              padding: 10px 0 ;
              border-bottom: 1px solid rgba(0,0,0,.2);
            }
          }
        }
      }
   }
`;

function Charts() {
  const incomeAndExpenditure = [
    {category: '-', name: '支出', iconName: 'expenditure'},
    {category: '+', name: '收入', iconName: 'income'}];
  return (
    <Layout>
      <ChartsWrapper>
        <div className="top-bar">
          <div className="category">支出 <Icon name='down'/></div>
          <CategoryBar categoryList={['week', 'month', 'year']} category='week' className={'categoryBar'}/>
          <div className="category-selector-wrapper">
            <ul className="category-selector">{
              incomeAndExpenditure.map(c=>{
                return (
                  <li>
                    <Icon name={c.iconName} className='left-icon'/>
                    <div>
                      <div>{c.name}</div>
                      <Icon name='tick' className='right-icon'/>
                    </div>
                  </li>
                )
              })
            }</ul>
          </div>
        </div>
        <div className="main-charts">
        </div>
        <div className="rank"></div>
      </ChartsWrapper>
    </Layout>
  );
}

export {Charts};