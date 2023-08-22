import { createSlice} from "@reduxjs/toolkit";
import { getAllExplore } from "../actions/explore.action";
const exploreCollectionDefaultState = {
    collections:[],
    isFetching:false,
    isFailed:false,
    page:1,
    hasMore:false, // it based on the formula COLLECTION_PER_FETCH==len(result_data_after_fethching)
    isSearched: false // to maintain wheather we have searched value or not

}
const COLLECTION_PER_FETCH = 100 // Threshold value for collections => After fething the collections if the no of results per fetch is is equeal to 20 that menas it can have more collections so that we can fetch more 
const SEARCH_PER_FETCH = 20
const getStructuredCollection = (collectionItem) => {
    const defaultStructure = {
        title:"",
        image:null,
        countOfLinks:0,
        username:"",
        tags:[],
        upvotes:[],
        views:0,
    }
    return {
        ...defaultStructure,
        ...collectionItem
    }
}

const exploreCollectionSlice = createSlice({
    name:"exploreCollections",
    initialState:exploreCollectionDefaultState,
    reducers:{
        startFetching:(state,action)=>{
            state.isFetching = true;
            if(action.payload.page==1){
                state.collections=[]
            }
        },
        fetchSuccess:(state,action)=>{
            const data = action.payload.data;
            state.collections = action.payload.page > 1 ? [...state.collections,...data.collections.map(getStructuredCollection)] : data.collections.map(getStructuredCollection);
            state.page=action.payload.page;
            state.isFetching=false
            state.isFailed=false
            state.hasMore=data.collections.length === COLLECTION_PER_FETCH;
            state.isSearched=false
        },
        fetchFailed:(state,action)=>{
            state.isFetching=false;
            state.isFailed=true;
        },
        upvote:(state,action)=>{
            console.log(action)
            const cIdx = state.collections.findIndex(coll=>coll._id===action.payload.collectionId);
            state.collections[cIdx].upvotes.push(action.payload.userId);
        },
        downvote:(state,action)=>{
            const cIdx = state.collections.findIndex(coll=>coll._id===action.payload.collectionId);
            state.collections[cIdx].upvotes = state.collections[cIdx].upvotes.filter(upvoted=>upvoted!==action.payload.userId);
        },
        searchedCollection:(state,action)=>{
            const data = action.payload.data;
            state.collections = action.payload.page > 1 ? [...state.collections,...data.collections.map(getStructuredCollection)] : data.collections.map(getStructuredCollection);
            state.page=action.payload.page;
            state.hasMore=data.collections.length === SEARCH_PER_FETCH;
            state.isSearched=true;
        }
    },
    // extraReducers:(builder)=>{
    //     builder.addCase(getAllExplore.pending,(state,action)=>{
    //         state.isFetching = true;
    //     })
    //     builder.addCase(getAllExplore.fulfilled,(state,action)=>{
    //         const data = action.payload.data;
    //         state.collections = action.payload.page > 1 ? [...state.collections,...data.collections.map(getStructuredCollection)] : data.collections.map(getStructuredCollection);
    //         state.page=action.payload.page;
    //         state.isFetching=false
    //         state.isFailed=false
    //         state.hasMore=data.collections.length === COLLECTION_PER_FETCH;
    //         state.isSearched=false
    //     })
    //     builder.addCase(getAllExplore.rejected,(state,action)=>{
    //         state.isFetching=false;
    //         state.isFailed=true;
    //     })
    // }
})

export const {upvote,downvote,searchedCollection,startFetching,fetchSuccess,fetchFailed} = exploreCollectionSlice.actions;

export default exploreCollectionSlice;
