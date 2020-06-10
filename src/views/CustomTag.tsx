import React from 'react';
import styled from 'styled-components';
import {Icon} from '../components/Icon';
import {CategoryBar} from '../components/CategoryBar';
import {useParams,useHistory} from "react-router-dom";

const CustomTagWrapper = styled.section`
    .topBar{
       background-color: #ffda44;
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
      .topBar-title{
        width: 100%;
        .icon{
          width: 26px;
          height: 26px;
          vertical-align: -0.15em;
          fill: black;
          overflow: hidden;
        }
        display: flex;
        font-size: 20px;
        padding:15px ;
        justify-content: space-between;
      }
      .categoryBar{
        width: 85%;
        margin-bottom: 10px;
      }
    }
`;

function CustomTag() {
  let { category } = useParams();
  const history = useHistory();
  return (
    <CustomTagWrapper>
      <div className="topBar">
        <div className='topBar-title'>
          <Icon name='left' className='icon' onClick={()=>{history.goBack()}}/>
          类别设置
          <Icon className='icon'/>
        </div>
       <CategoryBar categoryList={['-','+']} className='categoryBar' category={category}/>
      </div>
    </CustomTagWrapper>
  );
}

export {CustomTag};