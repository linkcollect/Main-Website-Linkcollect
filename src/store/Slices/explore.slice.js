import { createSlice} from "@reduxjs/toolkit";
import { getAllExplore } from "../actions/explore.action";
const exploreCollectionDefaultState = {
    collections:[],
    isFetching:false,
    isFailed:false,
}
const exploreCollectionSlice = createSlice({
    name:"exploreCollections",
    initialState:exploreCollectionDefaultState,
    reducers:{
        upvote:(state,action)=>{
            const cIdx = state.collections.findIndex(coll=>coll._id===action.payload.collectionId);
            state.collections[cIdx].upvotes.push(action.payload.userId);
        },
        downvote:(state,action)=>{
            const cIdx = state.collections.findIndex(coll=>coll._id===action.payload.collectionId);
            state.collections[cIdx].upvotes = state.collections[cIdx].upvotes.filter(upvoted=>upvoted!==action.payload.userId);
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllExplore.pending,(state,action)=>{
            state.isFetching = true;
        })
        builder.addCase(getAllExplore.fulfilled,(state,action)=>{
            const data = action.payload.data;
            console.log(data)
            state.collections = data.collections
            state.isFetching=false
            state.isFailed=false
        })
        builder.addCase(getAllExplore.rejected,(state,action)=>{
            state.isFetching=false;
            state.isFailed=true;
        })
    }
})

export const {upvote,downvote,collectionFething,collectionFetchingSuccess,collectionFetchingFailed} = exploreCollectionSlice.actions;

export default exploreCollectionSlice;
