import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getByUsername } from "../../api-services/userService";
import jwt from "jsonwebtoken"

export const getUserCollection  = createAsyncThunk(
    'getCollections',
    async (payload) =>{
        const res = await getByUsername(payload.username);
        return {data:res.data.data};
    }
)
