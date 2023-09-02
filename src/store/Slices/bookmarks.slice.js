import { createSlice } from "@reduxjs/toolkit"
import { getBookmarks } from "../actions/bookmarks.action"
import { dataSortByType } from "../../utils/utils"
import { logout } from "./user.slice"

const initialCollectionData ={
   collectionData:{},
   isFetching:false,
   isFailed:false
}

const getStructuredCollectionData = (data) => {
    const defaultCollectionDataStructure = {
        title:"",
        description:"",
        isPublic:false,
        isPinned:false,
        pinnedTime:null,
        userId:"",
        username:"",
        tags:[],
        timelines:[],
    }
    return {...defaultCollectionDataStructure,...data};
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
            state.collectionData.timelines=[{...action.payload.bookmarkData},...state.collectionData.timelines];
        },
        updateBookmark:(state,action) => {
            const bookmarkIndexToUpdate = state.collectionData.timelines.findIndex(tIdx=>tIdx._id === action.payload.updatedBookmark._id);
            if(bookmarkIndexToUpdate<0){
                throw Error('Sorry! unable to update. Try again later')
            }
            state.collectionData.timelines[bookmarkIndexToUpdate] = action.payload.updatedBookmark
        },
        deleteBookMark:(state,action) => {
            state.collectionData.timelines = state.collectionData.timelines.filter(tItem=>tItem._id!==action.payload.bookmarkID);
        },
        setTogglePinBookmark:(state,action)=>{
            const bookmarkToTogglePinIndex = state.collectionData.timelines.findIndex(tIdx=>tIdx._id===action.payload.bookmarkID);
            if(bookmarkToTogglePinIndex<0){
                throw Error('Sorry! unable to update. Try again later')
            }
            const bookmarksdata = state.collectionData.timelines;
            bookmarksdata[bookmarkToTogglePinIndex].isPinned = !state.collectionData.timelines[bookmarkToTogglePinIndex].isPinned
            bookmarksdata[bookmarkToTogglePinIndex].pinnedTime = Date.now(); 
            state.collectionData.timelines = dataSortByType([...bookmarksdata],action.payload.sortType);
        },
        sortBookmarksByType:(state,action)=>{
            state.collectionData.timelines =  dataSortByType([...state.collectionData.timelines],action.payload.sortType);
        },
        upvote:(state,action)=>{
            state.collectionData.upvotes.push(action.payload.userId);
        },
        downvote:(state,action)=>{
            state.collectionData.upvotes = state.collectionData.upvotes.filter(upvoted=>upvoted!==action.payload.userId);
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(getBookmarks.pending,(state,action)=>{
            state.isFetching = true
            state.collectionData={}
        });
        builder.addCase(getBookmarks.fulfilled,(state,action)=>{
            const structuredCollectionData = getStructuredCollectionData(action.payload.collectionData);
            const soretedBookmarks = dataSortByType([...structuredCollectionData.timelines],"RECENETLY_UPDATED");
            state.collectionData = {...structuredCollectionData,timelines:soretedBookmarks};
            state.isFetching=false;
            state.isFailed=false
        });
        builder.addCase(getBookmarks.rejected,(state,action)=>{
            state.isFailed = true;
            state.isFetching=false;
        });
        builder.addCase(logout.type,(state,action)=>{
            return initialCollectionData
        })
    }
})
export const {updateCollectionData,createBookmark,updateBookmark,setTogglePinBookmark,sortBookmarksByType,deleteBookMark,upvote,downvote} = collectionDataSlice.actions
export default collectionDataSlice