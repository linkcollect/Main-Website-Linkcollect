import { createSlice} from "@reduxjs/toolkit";
const collectionDefaultState = {
    collections:[],
    isFetching:false,
    isFailed:false,
}
const collectionSlice = createSlice({
    name:"collection",
    initialState:collectionDefaultState,
    reducers:{
        collectionFething:(state,action)=>{
            state.isFetching=true;
        },
        collectionFetchingSuccess:(state,action)=>{
            const data = action.payload.data;
            state.collections = data.collections
            state.isFetching=false
            state.isFailed=false
        },
        collectionFetchingFailed:(state,action)=>{
            state.isFetching=false;
            state.isFailed = true;
        },

        upvote:(state,action)=>{
            const cIdx = state.collections.findIndex(coll=>coll._id===action.payload.collectionId);
            state.collections[cIdx].upvotes.push(action.payload.userId);
        },
        downvote:(state,action)=>{
            const cIdx = state.collections.findIndex(coll=>coll._id===action.payload.collectionId);
            state.collections[cIdx].upvotes = state.collections[cIdx].upvotes.filter(upvoted=>upvoted!==action.payload.userId);
        },

        remove:(state,action)=>{
            state.collections = state.collections.filter(collectionItem=>collectionItem._id!==action.payload.collectionId);
        }
    },
})

export const {upvote,downvote,remove,collectionFething,collectionFetchingSuccess,collectionFetchingFailed} = collectionSlice.actions;

export default collectionSlice;