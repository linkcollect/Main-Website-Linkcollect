import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getByUsername } from "../../api-services/userService";
import { login } from "../../api-services/authService";
import jwt from "jsonwebtoken"
import { setJwtInRequestHeader } from "../../api-services/httpService";

export const loginAction = createAsyncThunk(
    'login',
    async (payload) =>{ 
        const res = await login(payload.email,payload.password);
        const token = res.data.data.token;
        const userData = res.data.data.userData;
        const { userId, username } = jwt.decode(token);
        setJwtInRequestHeader(token);
        return {userId,username,token,userData};
    }
)

export const getUserDetails = createAsyncThunk(
    'getUserDetails',
    async (payload) => {
        const { userId, username } = jwt.decode(payload.token);
        const res = await getByUsername(username);
        return {userId,username,token:payload.token,userData:res.data.data};
    }
)