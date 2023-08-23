import { createSlice } from "@reduxjs/toolkit"
import { getBookmarks } from "../actions/bookmarks.action"

const initialCollectionData ={
   collectionData:{},
   isFetching:false,
   isFailed:false
}

const collectionDataSlice = createSlice({
    name:"collectionData",
    initialState:initialCollectionData,
    reducers:{
        updateCollectionData:(state,action)=>{
              // As the api is returning updated data with timelines' id only , to persist the original timelines info we are storing it in the orignal timelines
              const originaltimelines = state.collectionData.timelines
              const {timelines,...data} = action.payload.updatedCollection
              state.collectionData = { timelines:[...originaltimelines],...data };
        },
        createBookmark:(state,action) =>{
            state.collectionData.timelines.push(action.payload.bookmarkData);
        },
        updateBookmark:(state,action) => {

        },
        deleteBookMark:(state,action) => {
            
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getBookmarks.pending,(state,action)=>{
            state.isFetching = true
            state.collectionData={}
        });
        builder.addCase(getBookmarks.fulfilled,(state,action)=>{
            state.collectionData = action.payload.collectionData;
            state.isFetching=false;
            state.isFailed=false
        });
        builder.addCase(getBookmarks.rejected,(state,action)=>{
            state.isFailed = true;
            state.isFetching=false;
        })
    }
})
export const {updateCollectionData,createBookmark} = collectionDataSlice.actions
export default collectionDataSlice