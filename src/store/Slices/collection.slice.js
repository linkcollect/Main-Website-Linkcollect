import { createSlice} from "@reduxjs/toolkit";
const collectionDefaultState = {
    collections:[],
    isFetching:false,
    isFailed:false,
}

const getStructuredCollection = (collectionItem) => {
    const defaultStructure = {
        title:"",
        image:null,
        timelines:[],
        username:"",
        tags:[],
        upvotes:[],
        views:0,
        isPinned:false,
        isPublic:false,
    }
    return {
        ...defaultStructure,
        ...collectionItem
    }
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
            state.collections = data.collections.map(getStructuredCollection)
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
        },

        addCollection:(state,action) =>{
            state.collections.push(action.payload.collection);
        }
    },
})

export const {upvote,downvote,remove,collectionFething,collectionFetchingSuccess,collectionFetchingFailed,addCollection} = collectionSlice.actions;

export default collectionSlice;
