import { createAsyncThunk } from "@reduxjs/toolkit";
import { upvote,downvote, removeSave } from "../Slices/save.slice";
import { save,unsave } from "../Slices/user.slice";
import { downvoteCollection, getSavedCollection, unsaveCollection, upvoteCollection } from "../../api-services/collectionService";

export const getSaveCollectionOfUser = createAsyncThunk(
    'getSaveCollection',
    async function (userId){
        const res =await getSavedCollection(userId);
        return {data:{collections:res.data.data}}
    }
)

//Upvote
export const upvoteAction = (collectionId,userId) =>{
    return async (dispatch) =>{
        dispatch(upvote({
            collectionId:collectionId,
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
            collectionId,
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


// Unsave
export const unsaveAction = (collectionId)=>{
    return async dispatch=>{
        // To romve the id from user data in redux store
        dispatch(unsave({
            collectionId
        }))

        // to remove from the save collection state and instan ui Update
        dispatch(removeSave({collectionId}));

        try{
            await unsaveCollection(collectionId)
        }catch{
            dispatch(save({
                collectionId
            }))
        }
    }
}
// Create
