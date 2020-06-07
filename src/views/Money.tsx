import {Layout} from '../components/Layout';
import React, {useState} from 'react';
import styled from 'styled-components';
import {Tags} from '../components/Money/Tags';

const CategorySection = styled.section`
    background-color: #ffda44;
    display: flex;
    justify-content: center;
    > button{
      border:none;
      background-color: transparent;
      font-size:22px;
      padding:10px 10px;
      outline: none;
      position: relative;
      &.active::after{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3px;
        background-color: #000;
      }
    }
`;


type Category = '-' | '+';

function Money() {
  // category
  const categoryMap = {'-': '支出', '+': '收入'};
  const [category, setCategory] = useState<Category>('-');
  const categoryList:Category[] = ['-', '+'];

  const toggleCategory = (itemCategory: ('-' | '+')) => {
    setCategory(itemCategory)
  };

  return (
    <Layout>
      <CategorySection>
        {categoryList.map(
          item => {
            return (
              <button key={item}
                      onClick={() => {
                        toggleCategory(item);
                      }}
                      className={item===category?'active':''}
              >{categoryMap[item]}</button>
            );
          }
        )}
      </CategorySection>
      <Tags category={category}/>
    </Layout>
  );
}

export {Money};