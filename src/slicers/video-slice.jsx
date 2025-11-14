import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    videos:[],
    videosCount:0
}

const videoSlice = createSlice({
    name:'video',
    initialState,
    reducers:{
        addWatchLater:(state, action) => {
            console.log(action.payload);
            state.videos.push(action.payload);
            state.videosCount = state.videos.length;
        },

        removeWatchLater:(state, action) => {
            const videoId = action.payload;
            state.videos = state.videos.filter(video => video.id !== videoId);
            state.videosCount = state.videos.length;
        }
    }
});

export const { addWatchLater, removeWatchLater } = videoSlice.actions;
export default videoSlice.reducer;