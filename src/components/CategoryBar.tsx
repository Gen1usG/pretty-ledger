import React from 'react';
import styled from 'styled-components';

const CategoryBarWrapper = styled.ul`
  display: flex; 
  justify-content: center;
  border:1px solid #343233;
  border-radius: 5px;
  >li{
    flex-grow: 1;
    text-align: center;
    &.selected{
      color:#ffda44;
      background-color: #343233;
    }
  }
`;

type Props = {
  categoryList: string[]
  category: '-' | '+'
  changeCategory:(value:'-'|'+')=>void
} & React.HTMLAttributes<HTMLUListElement>

const categoryHash: { [K: string]: string } = {
  '-': '支出',
  '+': '收入'
};

function CategoryBar(props: Props) {
  const {children, categoryList, ...reset} = props;

  return (<CategoryBarWrapper {...reset}>
    {props.categoryList.map(categoryItem => {
      return (<li key={categoryItem}
                  className={props.category === categoryItem ? 'selected' : ''}
                  onClick={()=>{props.changeCategory(categoryItem as '-' | '+')}}>
        {categoryHash[categoryItem]}</li>);
    })}
  </CategoryBarWrapper>);
}

export {CategoryBar};