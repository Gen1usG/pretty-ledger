import React, {useEffect, useState} from 'react';
import {Icon} from '../components/Icon';
import {CategoryBar} from '../components/CategoryBar';
import {useParams, useHistory} from "react-router-dom";
import {useTags} from '../lib/useTags';
import {Tag} from '../lib/defaultTags';
import {CustomTagWrapper} from '../components/styledComponent/CustomTagWrapper';

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
    if (!tag.custom) {
      target.show = !tag.show;
    }
    if (tag.custom) {
      const index = tags.indexOf(target);
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