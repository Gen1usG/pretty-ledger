import {createId} from './createId';

type Tag = {
  id: number
  name: string
  tagName: string;
  category: ('-' | '+')
}

const TagList: (Tag[]) = [
  {"id":createId(),"name":"car","tagName":"汽车","category":"-"},
  {"id":createId(),"name":"dailyNecessary","tagName":"日用品","category":"-"},
  {"id":createId(),"name":"food","tagName":"餐饮","category":"-"},
  {"id":createId(),"name":"gift","tagName":"礼物","category":"-"},
  {"id":createId(),"name":"house","tagName":"居住","category":"-"},
  {"id":createId(),"name":"medical","tagName":"医疗","category":"-"},
  {"id":createId(),"name":"relation","tagName":"人情","category":"-"},
  {"id":createId(),"name":"shopping","tagName":"购物","category":"-"},
  {"id":createId(),"name":"sing","tagName":"娱乐","category":"-"},
  {"id":createId(),"name":"snacks","tagName":"零食","category":"-"},
  {"id":createId(),"name":"sport","tagName":"运动","category":"-"},
  {"id":createId(),"name":"travel","tagName":"旅行","category":"-"},
  {"id":createId(),"name":"financial","tagName":"理财","category":"+"},
  {"id":createId(),"name":"salary","tagName":"工资","category":"+"},
  {"id":createId(),"name":"part-time","tagName":"兼职","category":"+"},
];

export {TagList}