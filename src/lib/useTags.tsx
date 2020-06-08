// {id:1,,name:'car',tagName:'汽车',category:'-'}
import {TagList} from './TagList';

// const AllTagList = {
//   '-': ["car", "dailyNecessary", "food", "gift", "house", "medical", "relation", "shopping", "sing", "snacks", "sport", "travel"],
//   '+': ["car"]
// };
// const tagsListHash: { [K: string]: string } = {
//   "car": '汽车',
//   "dailyNecessary": '日用品',
//   "food": '餐饮',
//   "gift": '礼物',
//   "house": '居住',
//   "medical": '医疗',
//   "relation": '人情',
//   "setting": '自定义',
//   "shopping": '购物',
//   "sing": '娱乐',
//   "snacks": '零食',
//   "sport": '运动',
//   "travel": '旅行'
// };

function useTags() {
  const getTags = () => {
    return TagList;
  };
  return {getTags};
}

export {useTags};