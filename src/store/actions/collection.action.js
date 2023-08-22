import { upvote,downvote } from "../Slices/collection.slice";
import { save,unsave } from "../Slices/user.slice";
import { downvoteCollection, saveCollection, unsaveCollection, upvoteCollection } from "../../api-services/collectionService";


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

// Pin 
