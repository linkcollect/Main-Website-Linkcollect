import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { upvote,downvote } from "../Slices/explore.slice";
import { save,unsave } from "../Slices/user.slice";
import { downvoteCollection, getExplore, saveCollection, unsaveCollection, upvoteCollection } from "../../api-services/collectionService";

export const getAllExplore = createAsyncThunk(
    'getAllExplore',
     async function (page=1){
        const res =await getExplore(page);
        console.log(res)
        return {data:{collections:res.data.data},page};
     }
)

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
// Create
