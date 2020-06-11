import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Icon} from '../components/Icon';
import {CategoryBar} from '../components/CategoryBar';
import {useParams, useHistory} from "react-router-dom";
import {useTags} from '../lib/useTags';
import {Tag} from '../lib/defaultTags';

const CustomTagWrapper = styled.section`
    display: flex;
    flex-direction: column;
    height: 100vh;
    .icon {
      vertical-align: -0.15em;
      overflow: hidden;
    }
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
          fill: black;
        }
        display: flex;
        font-size: 20px;
        padding:15px ;
        justify-content: space-between;
      }
      .categoryBar{
        width: 70%;
        margin-bottom: 10px;
      }
    }
    .tags-stage{
      flex-grow: 1;
      overflow: auto;
      .showTags button::after{
         content: '';
         background-color: #fff;
         display: block;
         margin: 0 auto;
         height: 2px;
         width: 14px;
         border:1px solid #fff;  
            
      }
      .showTags,.unshowTags{
        li{
          box-shadow: 0 -1px 2px -1.5px rgba(0,0,0,0.5);
          padding: 6px 0;
          display: flex;
          align-items: center;
          button{
            margin:0 8px;
            background-color: red;
            outline: none;
            border:none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
          >div{
            display: flex;
            align-items: center;
            font-size: 14px;
          }
          .iconWrapper{
              margin: 0 8px;
              background-color: #d5d5d5;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 12px;
             .icon{
                width: 18px;
                height: 18px;
                fill: #333;
             }
          }
          &:first-child{
            box-shadow: none;
          }
        }
      }
      .unshowTags{
        > div{
          margin: 10px 0 0 6px;
          font-size: 14px;
          color: #666;
        }
        button{
          display: flex;
          justify-content: center;
          align-items: center;
          > .icon{
            width: 16px;
            height: 16px;
            fill: #fff;  
          }
          background-color: green !important;
        }
      }
    }
    .addTagsButton{
      >button{
        width: 100%;
        background-color: #fff;
        border:none;
        display: flex;
        align-items: center;
        justify-content: center;
        padding:15px 0;
        outline: none;
        box-shadow: 0 0 0 .5px rgba(0,0,0,.5);
        .icon{
          width: 17px;
          height: 17px;
          fill: #4f4e4e;
        }
      }
    }
`;

function CustomTag() {
  const {category: paramsCategory} = useParams();
  const [category, setCategory] = useState(paramsCategory);
  const history = useHistory();
  const {tags, findTag, updateTags, createTag} = useTags();
  const [showTagList, setShowTagList] = useState<Tag[]>([]);
  const [unshowTagList, setUnshowTagList] = useState<Tag[]>([]);
  const onChangeCategory = (value: '-' | '+') => {
    setCategory(value);
  };

  useEffect(() => {
    const defaultTagList = tags.filter(t => t.category === category);
    setShowTagList(defaultTagList.filter(t => t.show));
    setUnshowTagList(defaultTagList.filter(t => !t.show));
  }, [tags, category]);

  const toggleShowTags = (tag: Partial<Tag>) => {
    const target = findTag(tag.id!);
    const index = tags.indexOf(target);
    // 切换默认标签
    if (!tag.custom) {
      const clone = JSON.parse(JSON.stringify(target));
      clone.show = !tag.show;
    }
    if (tag.custom) {
      // 删除自定义标签
      tags.splice(index, 1);
    }
    updateTags(tags);
  };

  const onCreateTag = () => {
    let tagName = window.prompt('请输入标签名（4个字或8个字母）') as string;
    if (tagName === null) return;
    if (tagName === '') return;
    // eslint-disable-next-line
    if (tagName.replace(/[^\x00-\xff]/g, 'aa').length > 8) return alert('最多4个字或8个字母');
    createTag(tagName, category);
  };

  return (
    <CustomTagWrapper>
      <div className="topBar">
        <div className='topBar-title'>
          <Icon name='left' className='icon' onClick={() => {
            history.goBack();
          }}/>
          类别设置
          <Icon className='icon'/>
        </div>
        <CategoryBar categoryList={['-', '+']} className='categoryBar' category={category}
                     changeCategory={onChangeCategory}/>
      </div>
      <div className='tags-stage'>
        <div className="showTags">
          <ul>
            {showTagList.map(t => {
              return (
                <li key={t.id}>
                  <button onClick={() => toggleShowTags(t)}/>
                  <div>
                    <div className='iconWrapper'><Icon name={t.name} className='icon'/></div>
                    {t.tagName}
                  </div>
                </li>
              );
            })}
          </ul>

        </div>
        <div className="unshowTags">
          <div>更多类别</div>
          <ul>
            {unshowTagList.map(t => {
              return (
                <li key={t.id}>
                  <button onClick={() => toggleShowTags(t)}><Icon name='add'/></button>
                  <div>
                    <div className='iconWrapper'><Icon name={t.name} className='icon'/></div>
                    {t.tagName}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className='addTagsButton'>
        <button onClick={onCreateTag}><Icon name='add' className='icon'/>添加类型</button>
      </div>
    </CustomTagWrapper>
  );
}

export {CustomTag};