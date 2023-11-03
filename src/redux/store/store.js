import {configureStore} from "@reduxjs/toolkit";
import postsReducer from "../slice/postSlice";

// store
const store =  configureStore({
    reducer: {
        posts: postsReducer,
    }
})

export default store;