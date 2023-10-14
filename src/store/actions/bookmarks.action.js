import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCollection } from '../../api-services/collectionService';
import { save, unsave } from '../Slices/user.slice';
import { upvote, downvote } from '../Slices/bookmarks.slice';
import {
  downvoteCollection,
  saveCollection,
  unsaveCollection,
  upvoteCollection,
} from '../../api-services/collectionService';

async function fetchMetaData(url) {
  let data = {
    images: [],
    description:
      'This Link has no Description 😔, but hey do you know that with linkcollect you can save all tabs using just a command and share them with your friends like this collection ?',
  };
  const apiUrl = `https://jsonlink.io/api/extract?url=${url}`;
  const backupLinkCollect = `https://dev.linkcollect.io/api/v1/analytics/getMetadata?url=${url}`;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const backupResponse = await fetch(backupLinkCollect);
      if (!backupResponse.ok) {
        return data;
      }
      const res = await backupResponse.json();
      if (res.description) {
        data.description = res.description;
      }
      if (res.images) {
        data.images = res.images;
      }
      return data;
    }
    const res = await response.json();
    if (res.description) {
      data.description = res.description;
    }
    if (res.images) {
      data.images = res.images;
    }

    return data;
  } catch (err) {
    console.log(err);
    return data;
  }
}
// Asynchronus function to get bookmarks by collection ID
export const getBookmarks = createAsyncThunk(
  'getAllBookMarks',
  async payload => {
    const res = await getCollection(payload.collectionId);
    const fetchMetaDataPromises = res.data.data.timelines.map(
      async timeline => {
        const newTimeLine = {
          ...timeline,
          isSelected: false,
          metaData: await fetchMetaData(timeline.link),
        };
        return newTimeLine;
      }
    );
    const updatedTimeline = await Promise.all(fetchMetaDataPromises);

    res.data.data.timelines = updatedTimeline;
    return { collectionData: res.data.data };
  }
);

//Upvote
export const upvoteAction = (collectionId, userId) => {
  return async dispatch => {
    dispatch(
      upvote({
        userId: userId,
      })
    );

    try {
      await upvoteCollection(collectionId);
    } catch {
      dispatch(
        downvote({
          collectionId: collectionId,
          userId: userId,
        })
      );
    }
  };
};

// downvote
export const downvoteAction = (collectionId, userId) => {
  return async dispatch => {
    dispatch(
      downvote({
        userId,
      })
    );
    try {
      await downvoteCollection(collectionId);
    } catch {
      dispatch(
        downvote({
          collectionId,
          userId,
        })
      );
    }
  };
};

// Save
export const saveAction = collectionId => {
  return async dispatch => {
    dispatch(
      save({
        collectionId,
      })
    );
    try {
      await saveCollection(collectionId);
    } catch {
      dispatch(
        unsave({
          collectionId,
        })
      );
    }
  };
};

// Unsave
export const unsaveAction = collectionId => {
  return async dispatch => {
    // To romve the id from user data in redux store
    dispatch(
      unsave({
        collectionId,
      })
    );
    try {
      await unsaveCollection(collectionId);
    } catch {
      dispatch(
        save({
          collectionId,
        })
      );
    }
  };
};
