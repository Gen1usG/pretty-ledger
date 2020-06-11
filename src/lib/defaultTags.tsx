import {createId} from './createId';

export type Tag = {
  id: number
  name: string
  tagName: string;
  category: ('-' | '+');
  show: boolean
  custom:boolean
}

const defaultTagList: (()=>Tag[]) =()=>{
  return [
    {"id": createId(), "name": "car", "tagName": "汽车", "category": "-", 'show': true,'custom':false},
    {"id": createId(), "name": "dailyNecessary", "tagName": "日用品", "category": "-", 'show': true,'custom':false},
    {"id": createId(), "name": "food", "tagName": "餐饮", "category": "-", 'show': true,'custom':false},
    {"id": createId(), "name": "gift", "tagName": "礼物", "category": "-", 'show': true,'custom':false},
    {"id": createId(), "name": "house", "tagName": "居住", "category": "-", 'show': true,'custom':false},
    {"id": createId(), "name": "medical", "tagName": "医疗", "category": "-", 'show': true,'custom':false},
    {"id": createId(), "name": "relation", "tagName": "人情", "category": "-", 'show': true,'custom':false},
    {"id": createId(), "name": "shopping", "tagName": "购物", "category": "-", 'show': true,'custom':false},
    {"id": createId(), "name": "sing", "tagName": "娱乐", "category": "-", 'show': true,'custom':false},
    {"id": createId(), "name": "snacks", "tagName": "零食", "category": "-", 'show': true,'custom':false},
    {"id": createId(), "name": "sport", "tagName": "运动", "category": "-", 'show': true,'custom':false},
    {"id": createId(), "name": "travel", "tagName": "旅行", "category": "-", 'show': true,'custom':false},
    {"id": createId(), "name": "financial", "tagName": "理财", "category": "+", 'show': true,'custom':false},
    {"id": createId(), "name": "salary", "tagName": "工资", "category": "+", 'show': true,'custom':false},
    {"id": createId(), "name": "part-time", "tagName": "兼职", "category": "+", 'show': true,'custom':false},
  ];
}

export {defaultTagList}