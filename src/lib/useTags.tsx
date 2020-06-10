import {TagList} from './TagList';

function useTags() {
  const getTags = () => {
    return TagList;
  };
  return {getTags};
}

export {useTags};