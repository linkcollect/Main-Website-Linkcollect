import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCollection } from "../../api-services/collectionService";
import { save,unsave } from "../Slices/user.slice";
import {upvote,downvote} from "../Slices/bookmarks.slice"
import { downvoteCollection, saveCollection, unsaveCollection, upvoteCollection } from "../../api-services/collectionService";


// Asynchronus function to get bookmarks by collection ID
export const getBookmarks = createAsyncThunk(
    'getAllBookMarks',
    async (payload) =>{ 
        const res = await getCollection(payload.collectionId);
        const timeLineWithIsSelectedData = [];
        res.data.data.timelines.map((timeline) => {
            const newTimeLine = {
              ...timeline,
              isSelected: false,
            };
            timeLineWithIsSelectedData.push(newTimeLine);
        });
        res.data.data.timelines = timeLineWithIsSelectedData;
        return {collectionData:res.data.data};
    }
)

//Upvote
export const upvoteAction = (collectionId,userId) =>{
    return async (dispatch) =>{
        dispatch(upvote({
            userId:userId
        }))

        try{
          await upvoteCollection(collectionId);
        }catch{
            dispatch(downvote({
                collectionId:collectionId,
                userId:userId
            }))
        }
    }
}

// downvote
export const downvoteAction = (collectionId,userId)=>{
    return async dispatch =>{
        dispatch(downvote({
            userId,
        }))
        try{
            await downvoteCollection(collectionId);
        }catch{
            dispatch(downvote({
                collectionId,
                userId,
            }))
        }
    }
}

// Save
export const saveAction = (collectionId)=>{
    return async dispatch=>{
        dispatch(save({
            collectionId
        }))
        try{
            await saveCollection(collectionId)
        }catch{
            dispatch(unsave({
                collectionId
            }))
        }
    }
}

// Unsave
export const unsaveAction = (collectionId)=>{
    return async dispatch=>{
        // To romve the id from user data in redux store
        dispatch(unsave({
            collectionId
        }))
        try{
            await unsaveCollection(collectionId)
        }catch{
            dispatch(save({
                collectionId
            }))
        }
    }
}