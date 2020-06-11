import {defaultTagList} from './defaultTags';

function useTags() {
  const getTags = () => {
    return defaultTagList;
  };
  const updateTag = () => {

  };
  return {getTags};
}

export {useTags};