import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCollection } from "../../api-services/collectionService";

// Asynchronus function to get bookmarks by collection ID
export const getBookmarks = createAsyncThunk(
    'getAllBookMarks',
    async (payload) =>{ 
        const res = await getCollection(payload.collectionId);
        const timeLineWithIsSelectedData = [];
        res.data.data.timelines.map((timeline) => {
            const newTimeLine = {
              ...timeline,
              isSelected: false,
            };
            timeLineWithIsSelectedData.push(newTimeLine);
        });
        res.data.data.timelines = timeLineWithIsSelectedData;
        return {collectionData:res.data.data};
    }
)