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
    border-left:1px solid  #343233;
    &.selected{
      color:#ffda44;
      background-color: #343233;
    }
    &:nth-child(1){
      margin-left: -1px;
      border-radius: 5px 0 0 5px;
    }
  }
`;

type Props = {
  categoryList: string[]
  category: '-' | '+' | 'week' | 'month' | 'year'
  changeCategory?: (value: '-' | '+') => void
  changeTimeRange?: (value: 'week' | 'month' | 'year') => void
} & React.HTMLAttributes<HTMLUListElement>


const categoryHash: { [K: string]: string } = {
  '-': '支出',
  '+': '收入',
  'week': '周',
  'month': '月',
  'year': '年',
};

function CategoryBar(props: Props) {
  const {children, categoryList, ...reset} = props;
  const onChangeCategory = (categoryItem: '-' | '+' | 'week' | 'month' | 'year') => {
    if (props.changeCategory) {
      props.changeCategory(categoryItem as '-' | '+');
    } else if (props.changeTimeRange) {
      props.changeTimeRange(categoryItem as 'week' | 'month' | 'year');
    }
  };
  return (<CategoryBarWrapper {...reset}>
    {props.categoryList.map(categoryItem => {
      return (<li key={categoryItem}
                  className={props.category === categoryItem ? 'selected' : ''}
                  onClick={() => {
                    onChangeCategory(categoryItem as '-' | '+' | 'week' | 'month' | 'year');
                  }}>
        {categoryHash[categoryItem]}</li>);
    })}
  </CategoryBarWrapper>);
}

export {CategoryBar};