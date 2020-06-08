import {Layout} from '../components/Layout';
import React, {useState} from 'react';
import {Tags} from '../components/Money/Tags';
import {Numpad} from '../components/Money/Numpad';
import {Category} from '../components/Money/Category';


function Money() {
  const [category, setCategory]  = useState<('-' | '+')>('-');
  const toggleCategory = (itemCategory: ('-' | '+')) => {
    setCategory(itemCategory);
  };
  return (
    <Layout>
      <Category category={category} toggleCategory={toggleCategory}/>
      <Tags category={category}/>
      <Numpad/>
    </Layout>
  );
}

export {Money};