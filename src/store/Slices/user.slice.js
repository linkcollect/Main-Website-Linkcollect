import { createSlice } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";
import { getUserDetails, loginAction } from "../actions/user.action";
const authDefaultState = {
    username:"",
    userId:"",
    token:"",
    isLoggedIn:false,
    isLoading:false,
    userData:{}
}


const AuthSlicer = createSlice({
    name:"auth",
    initialState:authDefaultState,
    reducers:{
        logout:()=>{
            localStorage.removeItem("token");
            return authDefaultState;
        },
        setLoggedInUser: (state,action) =>{
            const { userId, username } = jwt.decode(action.payload.token);
            state.userId = userId;
            state.username = username;
            state.isLoggedIn = true;
            state.isLoading=false;
            state.token = action.payload.token;
        },
        chageTotalLinks:(state,action)=>{
            state.userData.totalLinks=state.userData.totalLinks+Number(action.payload.changedBy);
        },
        changeNumberOfLinks:(state,action)=>{
            if(action.payload.type==='add'){
                state.userData.collections.push(action.payload.collecTionId);
                state.userData.collections+=1;
            }else{
                state.userData.collections = state.userData.collections.filter(coll=>coll._id!==action.payload.collectionId);
                state.userData.totalCollections-=1;
                state.userData.totalLinks-=action.payload.totalCollectionLink;
            }
        },
        save:(state,action)=>{
            state.userData.savedCollections.push(action.payload.collectionId);
        },
        unsave:(state,action)=>{
            state.userData.savedCollections = state.userData.savedCollections.filter(saveItem=>saveItem!=action.payload.collectionId);
        }

    },
    extraReducers:(builder) =>{
        builder.addCase(loginAction.fulfilled,(state,action)=>{
            state.userId=action.payload.userId;
            state.username=action.payload.username;
            state.isLoading=false;
            state.isLoggedIn=true;
            state.token=action.payload.token;
            state.userData=action.payload.userData;
            state.userData.totalCollections=action.payload.userData.collections.length;
            const totalLinks = 0;
            action.payload.userData.collections.map(col=>totalLinks+=col.timelines.length);
            state.userData.totalLinks = totalLinks;
            localStorage.setItem("token",action.payload.token);
        })
        builder.addCase(loginAction.pending,(state,action)=>{
            state.isLoading = true
        })
        builder.addCase(loginAction.rejected,(state,action)=>{
            state.isLoading=false;
        })
        // If the user is already logged then we need to get the data of the user
        builder.addCase(getUserDetails.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.userData=action.payload.userData;
            state.userData.totalCollections=action.payload.userData.collections.length;
            const totalLinks = 0;
            action.payload.userData.collections.map(col=>totalLinks+=col.timelines.length);
            state.userData.totalLinks = totalLinks;
            localStorage.setItem("token",action.payload.token);
        })
        builder.addCase(getUserDetails.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(getUserDetails.rejected,(state,action)=>{
            state.isLoading=false;
        })
    }
})

export const { logout,setLoggedInUser,save,unsave } = AuthSlicer.actions;

export default AuthSlicer;