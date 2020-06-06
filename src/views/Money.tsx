import {Layout} from '../components/Layout';
import React, {useState} from 'react';
import styled from 'styled-components';

const Category = styled.section`
    background-color: #ffda44;
    display: flex;
    justify-content: center;
    > button{
      border:none;
      background-color: transparent;
      font-size:22px;
      padding:5px 10px;
      outline: none;
      &.active{
        border-bottom: 2px solid black;
      }
    }
`;

function Money() {
  const categoryMap = {'-': '支出', '+': '收入'};
  const [category, setCategory] = useState<('-' | '+')>('-');

  return (
    <Layout>
      <Category>

      </Category>
    </Layout>
  );
}

export {Money};