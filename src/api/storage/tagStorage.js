import AsyncStorage from '@react-native-async-storage/async-storage';

const TAGS_STORAGE = '@tags';
const MEDIA_TAGS_STORAGE = '@media_tags';

export const addNewTag = async (tag) => {
  try {
    const tags = await getAllTags();
    tags.push(tag);
    const jsonValue = JSON.stringify(tags);
    await AsyncStorage.setItem(TAGS_STORAGE, jsonValue);
  } catch (error) {
    console.log(error);
  }
};

export const getAllTags = async () => {
  try {
    const value = await AsyncStorage.getItem(TAGS_STORAGE);
    if (value !== null) {
      return JSON.parse(value);
    }
    return [];
  } catch (e) {
    return [];
  }
};

export const removeTag = async (tags) => {
  try {
    const allTags = await getAllTags();
    const newTags = allTags.filter((t) => !tags.includes(t));
    const jsonValue = JSON.stringify(newTags);
    await AsyncStorage.setItem(TAGS_STORAGE, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const addTagToMedia = async (mediaName, tagName) => {
  try {
    const allMediaTagObjects = await getAllMediaTagObjects();
    for (let i = 0; i < allMediaTagObjects.length; i++) {
      const tagObj = allMediaTagObjects[i];
      if (tagObj.name === mediaName) {
        updateExistingObject(tagName, tagObj, allMediaTagObjects, mediaName);
        return;
      }
    }
    addNewObject(mediaName, tagName, allMediaTagObjects);
  } catch (e) {
    console.log(e);
  }
};

function updateExistingObject(tagName, tagObj, allMediaTagObjects, mediaName) {
  const tmpObj = {
    name: mediaName,
    tags: appendNewTag(tagObj.tags, tagName),
  };
  const newMediaTags = allMediaTagObjects
    .filter((o) => o.name !== mediaName)
    .concat([tmpObj]);
  AsyncStorage.setItem(MEDIA_TAGS_STORAGE, JSON.stringify(newMediaTags));
}

function appendNewTag(tags, newTag) {
  if (tags.includes(newTag)) return tags;
  return tags.concat([newTag]);
}

function addNewObject(mediaName, tagName, allMediaTagObjects) {
  const tmpObj = {
    name: mediaName,
    tags: [tagName],
  };
  const newMediaTags = allMediaTagObjects.concat([tmpObj]);
  AsyncStorage.setItem(MEDIA_TAGS_STORAGE, JSON.stringify(newMediaTags));
}

export const getTagsForMedia = async (mediaName) => {
  try {
    const allMediaTags = await getAllMediaTagObjects();
    for (let i = 0; i < allMediaTags.length; i++) {
      const tagObj = allMediaTags[i];
      if (tagObj.name === mediaName) return tagObj.tags;
    }
  } catch (e) { console.log(e); }
  return [];
};

const getAllMediaTagObjects = async () => {
  try {
    const allMediaTags = await AsyncStorage.getItem(MEDIA_TAGS_STORAGE);
    if (allMediaTags !== null) return JSON.parse(allMediaTags);
  } catch (e) { console.log(e); }
  return [];
};

export const removeTagFromMedia = async (mediaName, tagName) => {
  try {
    const allMediaTagObjects = await getAllMediaTagObjects();
    for (let i = 0; i < allMediaTagObjects.length; i++) {
      const tagObj = allMediaTagObjects[i];
      if (tagObj.name === mediaName) {
        removeTagFromMediaAndSave(mediaName, tagObj, tagName, allMediaTagObjects);
        return;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

function removeTagFromMediaAndSave(mediaName, tagObj, tagName, allMediaTagObjects) {
  const tmpObj = {
    name: mediaName,
    tags: tagObj.tags.filter((t) => tagName !== t),
  };
  const newMediaTags = allMediaTagObjects
    .filter((o) => o.name !== mediaName)
    .concat([tmpObj]);
  AsyncStorage.setItem(MEDIA_TAGS_STORAGE, JSON.stringify(newMediaTags));
}
