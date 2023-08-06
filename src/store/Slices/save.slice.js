import { createSlice} from "@reduxjs/toolkit";
import { getSaveCollectionOfUser } from "../actions/save.actions";
const saveCollectionDefaultState = {
    collections:[],
    isFetching:false,
    isFailed:false,
}
const saveCollectionSlice = createSlice({
    name:"saveCollection",
    initialState:saveCollectionDefaultState,
    reducers:{
        upvote:(state,action)=>{
            const cIdx = state.collections.findIndex(coll=>coll._id===action.payload.collectionId);
            state.collections[cIdx].upvotes.push(action.payload.userId);
        },
        downvote:(state,action)=>{
            const cIdx = state.collections.findIndex(coll=>coll._id===action.payload.collectionId);
            state.collections[cIdx].upvotes = state.collections[cIdx].upvotes.filter(upvoted=>upvoted!==action.payload.userId);
        },
        // If we unsave it we need to remove it from the state also
        removeSave:(state,action)=>{
            console.log(action.payload.collectionId)
            state.collections = [...state.collections.filter(collectionItem=> collectionItem._id!==action.payload.collectionId)];
            console.log(state.collections)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getSaveCollectionOfUser.pending,(state,action)=>{
            state.isFetching= true;
        })
        builder.addCase(getSaveCollectionOfUser.fulfilled,(state,action)=>{
            const data = action.payload.data;
            state.collections = data.collections
            state.isFetching=false
            state.isFailed=false
        })
        builder.addCase(getSaveCollectionOfUser.rejected,(state,action)=>{
            state.isFetching=false;
            state.isFailed=true;
        })
    }
})

export const {upvote,downvote,removeSave,collectionFething,collectionFetchingSuccess,collectionFetchingFailed} = saveCollectionSlice.actions;

export default saveCollectionSlice;
