import {Layout} from '../components/Layout';
import React, {useState} from 'react';
import {Tags} from '../components/Money/Tags';
import {Numpad} from '../components/Money/Numpad';
import {Category} from '../components/Money/Category';
import {Tag} from '../lib/defaultTags';
import {useRecord} from '../lib/useRecord';

export type Record = {
  tag: Partial<Tag>
  note: string
  account: number
  category: '-' | '+'
  createAt: string
  id: number
}


function Money() {
  const {createRecord} = useRecord();
  const [category, setCategory] = useState<('-' | '+')>('-');
  const [record, setRecord] = useState<Record>({
    tag: {id: 0, name: '', tagName: '', category: '-', show: true},
    note: '',
    account: 0,
    category: category,
    createAt: ''
    ,
    id: -1
  });

  const toggleCategory = (itemCategory: ('-' | '+')) => {
    setCategory(itemCategory);
    setRecord({...record, category: itemCategory});
  };

  const onChange = (value: Partial<Record>) => {
    setRecord({...record, ...value});
  };

  const onSubmit = () => {
    if (record.tag.id === 0) return alert('请选择一个标签');
    if (record.account === 0) return alert('请输入金额');
    createRecord(record);
    setRecord({
      tag: {id: 0, name: '', tagName: '', category: '-', show: true},
      note: '',
      account: 0,
      category: category,
      createAt: ''
      ,
      id: -1
    });
  };

  return (
    <Layout>
        <Category category={category} toggleCategory={toggleCategory}/>
        <Tags category={category} tag={record.tag} onChange={onChange}/>
        <Numpad note={record.note} account={record.account} onChange={onChange} onSubmit={onSubmit}/>
    </Layout>
  );
}

export {Money};