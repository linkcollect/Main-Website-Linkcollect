import { createSlice} from "@reduxjs/toolkit";
import { getUserCollection } from "../actions/collection.action";
const collectionDefaultState = {
    user:{
        name:"",
        socials:[],
        totalViews:0,
        totalCollections:0,
    },
    collections:[],
    isFetching:false,
    isFailed:false,
}
const userCollectionSlice = createSlice({
    name:"collection",
    initialState:collectionDefaultState,
    extraReducers:(builder) =>{
        builder.addCase(getUserCollection.fulfilled,(state,action)=>{
            const {data} = action.payload;
            state.user = {
                name:data.name,
                socials:data.socials?data.socials : [],
                totalViews:data.totalViews?data.totalViews:0,
                totalCollections:data.collections.length,
            }
            state.collections = data.collections
            state.isFetching=false
            state.isFailed=false

        })
        builder.addCase(getUserCollection.pending,(state,action)=>{
            state.isFetching=true;
        })
        builder.addCase(getUserCollection.rejected,(state,action)=>{
            state.isFailed = true;
            state.isFetching = false;
        })

    }
})

export default userCollectionSlice;
