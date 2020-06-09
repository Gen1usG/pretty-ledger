import {Layout} from '../components/Layout';
import React, {useEffect, useState} from 'react';
import {Tags} from '../components/Money/Tags';
import {Numpad} from '../components/Money/Numpad';
import {Category} from '../components/Money/Category';
import {Tag} from '../lib/TagList';

export type Record = {
  tag: Tag | {}
  note: string
  account: number
  category: '-' | '+'
  createAt: string
}

function Money() {
  const [category, setCategory] = useState<('-' | '+')>('-');
  const [record, setRecord] = useState<Record>({
    tag: {}, note: '', account: 0, category: category, createAt: ''
  });
  const toggleCategory = (itemCategory: ('-' | '+')) => {
    setCategory(itemCategory);
    setRecord({...record, category:itemCategory})
  };

  const onChange = (value: Partial<Record>) => {
    setRecord({...record, ...value});
  };


  useEffect(()=>{
    console.log(record);
  },[record]);


  return (
    <Layout>
      <Category category={category} toggleCategory={toggleCategory}/>
      <Tags category={category} tag={record.tag} onChange={onChange}/>
      <Numpad note={record.note} account={record.account} onChange={onChange}/>
    </Layout>
  );
}

export {Money};