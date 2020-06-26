import React, {useEffect, useState} from 'react';
import {Icon} from '../components/Icon';
import {CategoryBar} from '../components/CategoryBar';
import {useParams, useHistory} from "react-router-dom";
import {useTags} from '../lib/useTags';
import {Tag} from '../lib/defaultTags';
import {CustomTagWrapper} from '../components/styledComponent/CustomTagWrapper';
import {Input, message, Modal} from 'antd';
import 'antd/dist/antd.css';
import classNames from 'classnames';
const modalButtonStyle = {
  outline:'none',
  borderColor:"#ffda44",
  backgroundColor: "#ffda44",
  color:'#334444'
};
function CustomTag() {
  const {category: paramsCategory} = useParams();
  const [category, setCategory] = useState(paramsCategory);
  const history = useHistory();
  const {tags, findTag, updateTags, createTag} = useTags();
  const [showTagList, setShowTagList] = useState<Tag[]>([]);
  const [unshowTagList, setUnshowTagList] = useState<Tag[]>([]);
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const [newTagName, setNewTagName] = useState('');


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
    setConfirmVisible(true);
  };

  const okModal = () => {
    if (newTagName === '') return message.info('标签名不能为空');
    // eslint-disable-next-line
    if (newTagName.replace(/[^\x00-\xff]/g, 'aa').length > 8) return message.info('最多4个字或8个字母');
    createTag(newTagName, category);
    setConfirmVisible(false);
    message.info('成功创建标签');
  };
  const cancelModal = () => {
    setNewTagName('');
    setConfirmVisible(false);
  };

  return (
    <CustomTagWrapper>
      <Modal title="请输入标签名" visible={confirmVisible}
             width='300px' destroyOnClose={true}
             onCancel={cancelModal} onOk={okModal}
             okText={'确认'} cancelText={'取消'} okButtonProps={{style:modalButtonStyle}}>
        <Input placeholder="4个汉字或8个字母" id='newTagNameInput'
               onChange={(e) => {
          setNewTagName(e.target.value)}}
        />
      </Modal>
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