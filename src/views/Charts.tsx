import React from 'react';
import {Layout} from '../components/Layout';
import styled from 'styled-components';
import {CategoryBar} from '../components/CategoryBar';
import {Icon} from '../components/Icon';
const ChartsWrapper = styled.div`
   .icon{
      width: 14px;
      height: 14px;
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
      
   }
`;

function Charts() {
  return (
    <Layout>
      <ChartsWrapper>
        <div className="top-bar">
          <div className="category">支出 <Icon name='down'/>  </div>
          <CategoryBar categoryList={['week','month','year']} category='week' className={'categoryBar'}/>
        </div>
        <div className="main-charts"></div>
        <div className="rank"></div>
      </ChartsWrapper>
    </Layout>
  );
}

export {Charts};