import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../api-services/authService";
import jwt from "jsonwebtoken";
import { getByUsername } from "../../api-services/userService";
import { loginAction } from "../actions/user.action";
const authDefaultState = {
    username:"",
    userId:"",
    token:"",
    isLoggedIn:false,
    isLoading:false,
}


const AuthSlicer = createSlice({
    name:"auth",
    initialState:authDefaultState,
    reducers:{
        logout:()=>{
            localStorage.removeItem("token");
            return authDefaultState;
        },
        // Is user already loogedin or coming from email varification or page get refreshed
        setLoggedInUser: (state,action) =>{
            const { userId, username } = jwt.decode(action.payload.token);
            state.userId = userId;
            state.username = username;
            state.isLoggedIn = true;
            state.isLoading=false;
            state.token = action.payload.token;
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(loginAction.fulfilled,(state,action)=>{
            state.userId=action.payload.userId;
            state.username=action.payload.username;
            state.isLoading=false;
            state.isLoggedIn=true;
            state.token=action.payload.token;
            localStorage.setItem("token",action.payload.token);
        })
        builder.addCase(loginAction.pending,(state,action)=>{
            state.isLoading = true
        })
        builder.addCase(loginAction.rejected,(state,action)=>{
            console.log(action)
            state.isLoading=false;
        })
    }
})

export const {logout,setLoggedInUser} = AuthSlicer.actions;

export default AuthSlicer;