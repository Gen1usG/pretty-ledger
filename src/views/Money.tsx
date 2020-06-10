import {Layout} from '../components/Layout';
import React, {useEffect, useState} from 'react';
import {Tags} from '../components/Money/Tags';
import {Numpad} from '../components/Money/Numpad';
import {Category} from '../components/Money/Category';
import {Tag} from '../lib/TagList';
import {useRecord} from '../lib/useRecord';

export type Record = {
  tag: Tag | undefined
  note: string
  account: number
  category: '-' | '+'
  createAt: string
}

function Money() {
  const {createRecord} = useRecord();
  const [category, setCategory] = useState<('-' | '+')>('-');
  const [record, setRecord] = useState<Record>({
    tag: undefined, note: '', account: 0, category: category, createAt: ''
  });
  const toggleCategory = (itemCategory: ('-' | '+')) => {
    setCategory(itemCategory);
    setRecord({...record, category: itemCategory});
  };

  const onChange = (value: Partial<Record>) => {
    setRecord({...record, ...value});
  };
  const onSubmit = () => {
    if (!(record.tag)) return alert('请选择一个标签');
    if (record.account === 0) return alert('请输入金额');
    console.log(record);
    createRecord(record);
  };


  useEffect(() => {
    console.log(record);
  }, [record]);


  return (
    <Layout>
      <Category category={category} toggleCategory={toggleCategory}/>
      <Tags category={category} tag={record.tag} onChange={onChange}/>
      <Numpad note={record.note} account={record.account} onChange={onChange} onSubmit={onSubmit}/>
    </Layout>
  );
}

export {Money};