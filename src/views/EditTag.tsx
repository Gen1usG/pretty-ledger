import React, {useState} from 'react';
import styled from 'styled-components';
import {Layout} from '../components/Layout';
import {Icon} from '../components/Icon';
import {BeautyIcon} from '../components/BeautyIcon';
import {useRecord} from '../lib/useRecord';
import {useParams, useHistory} from 'react-router-dom';
import {Record} from './Money';
import dayjs from 'dayjs';

const EditTagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .icon{
    width: 18px;
    height: 18px;
  }
  .top-wrapper{
    background-color: #ffda44;
    display: flex;
    justify-content: space-between;
    padding:  8px 14px;
    .back-wrapper{
      padding: 14px 8px;
    }
    .icon-wrapper{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .beauty-icon{
        background-color: #fff;
        width: 50px;
        height: 50px;
        margin-bottom: 8px;
      }
    }

    .right{
      display: none;
    }
  }
  .content{
    .content-item{
      color:#a5a5a5;
      border-bottom: 1px solid rgba(0,0,0,.2);
      margin-left:20px;
      padding:18px 0;
      >span{
        padding-left:8px;
        color:#334444;
      }
    }
  }
  
 .delete{
    outline: none;
    color: #fff;
    margin:50px auto;
    width: 120px;
    font-size: 20px;
    border:none;
    border-radius: 10px;
    background-color: red;
    padding:12px;
 }
`;

function EditTag() {
  const history = useHistory();
  const {id: recordId} = useParams();
  const {findRecord, deleteRecord} = useRecord();
  const [record] = useState<Record>(findRecord(parseInt(recordId)));
  const weekArr: string[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const onDelete = (id: number) => {
    const confirm = window.confirm('确定删除吗？删除后数据将不可恢复');
    if(confirm){
      deleteRecord(id);
      history.goBack();
    }
    return
  };
  return (
    <Layout>
      <EditTagWrapper>
        <div className="top-wrapper">
          <div className={'back-wrapper'} onClick={() => {
            history.goBack();
          }}><Icon name='left'/></div>
          <div className="icon-wrapper">
            <BeautyIcon name={record.tag.name!} className={'beauty-icon'}/>
            {record.tag.tagName}
          </div>
          <Icon name={''}/>
        </div>
        <div className="content">
          <div className="content-item">类型 <span>{{'-': '支出', '+': '收入'}[record.category]}</span></div>
          <div className="content-item">金额 <span>{record.account}</span></div>
          <div
            className="content-item">时间 <span>{dayjs(record.createAt).format('YYYY年MM月DD日') + ' ' + weekArr[dayjs(record.createAt).day()]}</span>
          </div>
          <div className="content-item">备注 <span>{record.note === '' ? record.tag.tagName : record.note}</span></div>
        </div>
        <button className="delete" onClick={()=>{onDelete(parseInt(recordId))}}>删除标签</button>
      </EditTagWrapper>
    </Layout>

  );
}

export {EditTag};