import React, {useEffect, useRef, useState} from 'react';
import {Icon} from '../Icon';
import styled from 'styled-components';
import {useTags} from 'lib/useTags';
import {Tag} from '../../lib/defaultTags';
import {Record} from '../../views/Money';
import {Link} from 'react-router-dom';

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
  > a { 
    font-size: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  li{
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

type Props = {
  category: ('-' | '+')
  tag: Partial<Tag>
  onChange: (value: Partial<Record>) => void
}

function Tags(props: Props) {
  const {tags} = useTags();
  const [tagList, setTagList] = useState(tags.filter(t => t.category === props.category).filter(t=>t.show));
  const [selectedTag, setSelectedTag] = useState<number>(props.tag.id!);

  const refTagWrapper: any = useRef(null);

  useEffect(() => {
    refTagWrapper.current.style.height = (window.screen.height - 57 - 245 - 54) + 'px';
  }, []);

  useEffect(() => {
    setTagList(tags.filter(t => t.category === props.category));
  }, [props.category]);

  useEffect(() => {
    setSelectedTag(props.tag.id!);
  }, [props.tag.id]);


  return (
    <TagsWrapper ref={refTagWrapper}>
      {tagList.map(tag => {
        return (<TagWrapper key={tag.id}>
          <li onClick={() => {
            setSelectedTag(tag.id);
            props.onChange({tag: tag});
          }} className={tag.id === selectedTag ? 'selected' : ''}><Icon name={tag.name} className='icon'/></li>
          {tag.tagName}</TagWrapper>);
      })}
      <TagWrapper>
        <Link to={`/CustomTag/${props.category}`}>
          <li><Icon name='setting' className='icon'/></li>
          自定义 </Link></TagWrapper>
</TagsWrapper>
)
  ;
}

export {Tags};