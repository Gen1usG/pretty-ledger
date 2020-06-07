import React, {useEffect, useRef, useState} from 'react';
import {Icon} from '../Icon';
import styled from 'styled-components';

const TagsWrapper = styled.ul`
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
`;
const TagWrapper = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color:#222;
  margin: 12px 0;
  > li{
    background-color: #f5f5f5;
    border-radius: 50%;
    padding:10px;
    margin-bottom: 3px;
    .icon{
     width: 30px;
     height: 30px;
     vertical-align: -0.15em;
     fill: #4f4e4e;
     overflow: hidden;
    }
    &.selected{
    background-color: #ffda44;
    }
  }
  
`;
const AllTagList = {
  '-': ["car", "dailyNecessary", "food", "gift", "house", "medical", "relation", "shopping", "sing", "snacks", "sport", "travel"],
  '+': ["car"]
};

const tagsListHash: { [K: string]: string } = {
  "car": '汽车',
  "dailyNecessary": '日用品',
  "food": '餐饮',
  "gift": '礼物',
  "house": '居住',
  "medical": '医疗',
  "relation": '人情',
  "setting": '自定义',
  "shopping": '购物',
  "sing": '娱乐',
  "snacks": '零食',
  "sport": '运动',
  "travel": '旅行'
};

function Tags(props: { category: ('-' | '+') }) {
  const [tagList,setTagList] = useState(AllTagList[props.category]);
  const [selectedTag, setSelectedTag] = useState('');
  const tagSelected = (tag: string) => {
    setSelectedTag(tag);
  };

  const refTagWrapper:any  = useRef(null);

  useEffect(()=>{
    refTagWrapper.current.style.height = (window.screen.height - 57 - 245 - 54) + 'px'
  },[]);

  useEffect(()=>{
    setTagList(AllTagList[props.category])
  },[props.category]);

  return (
    <TagsWrapper ref={refTagWrapper}>
      {tagList.map(tag => {
        return (<TagWrapper key={tag}>
          <li onClick={() => {
            tagSelected(tag);
          }} className={tag === selectedTag ? 'selected' : ''}><Icon name={tag} className='icon'/></li>
          {tagsListHash[tag]}</TagWrapper>);
      })}
      <TagWrapper>
        <li><Icon name='setting' className='icon'/></li>
        {tagsListHash['setting']}</TagWrapper>
    </TagsWrapper>
  );
}

export {Tags};