import React from 'react';
import styled from 'styled-components';

const CategorySection = styled.section`
    background-color: #ffda44;
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
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

type Props = {
  category : Category;
  toggleCategory:(category:Category)=>void;
}
function Category(props:Props) {
  const categoryMap = {'-': '支出', '+': '收入'};
  const categoryList: Category[] = ['-', '+'];

  return (<CategorySection>
    {categoryList.map(
      item => {
        return (
          <button key={item}
                  onClick={() => {
                    props.toggleCategory(item);
                  }}
                  className={item === props.category ? 'active' : ''}
          >{categoryMap[item]}</button>
        );
      }
    )}
  </CategorySection>)
}
export {Category}