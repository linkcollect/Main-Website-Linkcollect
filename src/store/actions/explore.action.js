import { createAsyncThunk } from "@reduxjs/toolkit";
import { upvote,downvote,startFetching,fetchSuccess,fetchFailed } from "../Slices/explore.slice";
import { save,unsave } from "../Slices/user.slice";
import { downvoteCollection, getExplore, saveCollection, unsaveCollection, upvoteCollection } from "../../api-services/collectionService";

// sortby can be -  createdAt, views, upvotes
export const getAllExplore = (page=1, sortBy = 'upvotes') =>{
  return async dispatch =>{
    dispatch(startFetching({page}));
    try{
        const res =await getExplore(page, sortBy);
        dispatch(fetchSuccess({data:{collections:res.data.data},page}));
    }catch(e){
        dispatch(fetchFailed());
    }
  }
}


// Need to implement
export const getSearchCollections = createAsyncThunk(
    'getSearchedCollection',
    async function (){
        // const res = 
    }
)

//Upvote
export const upvoteAction = (collectionId,userId) =>{
    return async (dispatch) =>{
        
        try{
            dispatch(upvote({
                collectionId:collectionId,
                userId:userId
            }))
          await upvoteCollection(collectionId);
        }catch(e){
            console.log(e)
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
        try{
            dispatch(downvote({
                collectionId,
                userId,
            }))
            await downvoteCollection(collectionId);
        }catch(e){
            console.log(e);
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
        try{
            dispatch(save({
                collectionId
            }))
            await saveCollection(collectionId)
        }catch(e){
            console.log(e);
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
        
        try{
            dispatch(unsave({
                collectionId
            }))
            await unsaveCollection(collectionId)
        }catch(e){
            console.log(e)
            dispatch(save({
                collectionId
            }))
        }
    }
}

