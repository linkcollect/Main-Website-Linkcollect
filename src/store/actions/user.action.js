import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getByUsername } from "../../api-services/userService";
import { login } from "../../api-services/authService";
import jwt from "jsonwebtoken"

export const loginAction = createAsyncThunk(
    'login',
    async (payload) =>{
        console.log(payload.email,payload.password)
        const res = await login(payload.email,payload.password);
        const token = res.data.data.token;
        const { userId, username } = jwt.decode(token);
        return {userId,username,token};
    }
)