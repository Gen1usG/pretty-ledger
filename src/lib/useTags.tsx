import {defaultTagList, Tag} from './defaultTags';
import {useEffect, useState} from 'react';

function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    let localTags = JSON.parse(window.localStorage.getItem('Tags') || '[]');
    if (localTags.length === 0) {
      localTags = defaultTagList();
      saveTags(localTags);
    }
    setTags(localTags);
  }, []);

  const findTag = (id: number) => {
    return tags.filter(t => t.id === id)[0];
  };

  const saveTags = (newTagsList: Tag[]) => {
    window.localStorage.setItem('Tags', JSON.stringify(newTagsList));
  };


  const updateTags = (newTags: Tag[]) => {
    const temp = JSON.parse(JSON.stringify(newTags));
    saveTags(temp);
    setTags(temp);
  };

  return {tags, findTag, saveTags, updateTags};
}

export {useTags};