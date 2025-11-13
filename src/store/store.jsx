import { configureStore } from "@reduxjs/toolkit";
import videoReducer from '../slicers/video-slice'
 
const store = configureStore({
    reducer:{
       video: videoReducer
    }
})

export default store;