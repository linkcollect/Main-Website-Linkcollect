import { createSlice } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";
import { getUserDetails, loginAction } from "../actions/user.action";
import { addCollection } from "./collection.slice";
import { createBookmark } from "./bookmarks.slice";
const authDefaultState = {
  username: "",
  userId: "",
  token: "",
  isLoggedIn: false,
  isLoading: false,
  userData: {
    email: "",
    isPremium: false,
    isPublic: false,
    totalCollections: 0,
    totalLinks: 0,
    collections: [], 
    savedCollections: [],
  },
};

// userData saving utility
const setUserData = (state,action) =>{
  const {email,isPremium,isPublic,savedCollections,collections} = action.payload.userData;
      state.userData = {...state.userData,email,isPremium,isPublic,savedCollections};
      state.userData.totalCollections =
        action.payload.userData.collections.length;
      let totalLinks = 0;
      action.payload.userData.collections.map(
        (col) => (totalLinks += col.timelines.length)
      );
      state.userData.collections = collections.map(collectionItem=> ({collectionId:collectionItem._id,name:collectionItem.name}))
      state.userData.totalLinks = totalLinks;
}

// User Authentication information utilty
const setLoggedInInFormation = (state,action) =>{
  const { userId, username } = jwt.decode(action.payload.token);
  state.userId = userId;
  state.username = username;
  state.isLoading = false;
  state.isLoggedIn = true;
  state.token = action.payload.token; 
}

const AuthSlicer = createSlice({
  name: "auth",
  initialState: authDefaultState,
  reducers: {
    logout: () => {
      localStorage.removeItem("token");
      return authDefaultState;
    },
    setLoggedInUser: (state, action) => {
      setLoggedInInFormation(state,action)
    },
    save: (state, action) => {
      state.userData.savedCollections.push(action.payload.collectionId);
    },
    unsave: (state, action) => {
      state.userData.savedCollections = state.userData.savedCollections.filter(
        (saveItem) => saveItem !== action.payload.collectionId
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      setLoggedInInFormation(state,action);
      setUserData(state,action);
    });
    builder.addCase(loginAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.isLoading = false;
    });
    // If the user is already logged then we need to get the data of the user
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      setUserData(state,action);
    });
    builder.addCase(getUserDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.isLoading = false;
    });

    // when ever we will creat the new collection we are gonna dispacth a action from collectionSlice and it will update the store
    // so we alse need to catch that action from user slice so that we can update the total collection for data consistancy
    builder.addCase(addCollection.type, (state, action) => {
      state.userData.totalCollections += 1;
    });
    // when ever we will creat the new bookmar we are gonna dispacth a action from bookmarkSlice and it will update the store
    // so we alse need to catch that action from user slice so that we can update the total links for data consistancy
    builder.addCase(createBookmark.type,(state,collectio)=>{
      state.userData.totalLinks+=1;
    })
  },
});

export const { logout, setLoggedInUser, save, unsave } = AuthSlicer.actions;

export default AuthSlicer;
