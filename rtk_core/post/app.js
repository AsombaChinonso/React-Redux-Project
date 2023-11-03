const {createAsyncThunk, createSlice, configureStore } = require("@reduxjs/toolkit");
const axios = require('axios');
const logger = require('redux-logger').createLogger();

const API = "https://jsonplaceholder.typicode.com/posts"
// Initial state
const initialState = {
    posts: [],
    loading: false,
    error: null,
}

// Create Async thunk
const fetchPost = createAsyncThunk('posts/fetchPosts', async ()=>{
    const response = await axios.get(API);
    return response.data;
})



// Slice
const fetchPostSlice = createSlice({
    name: "posts",
    initialState: initialState,
    extraReducers: (builder)=>{

        // pending
        builder.addCase(fetchPost.pending, (state, action)=>{
            state.loading = true;
        })

        // fulfilled
        builder.addCase(fetchPost.fulfilled, (state, action)=>{
            state.posts = action.payload;
            state.loading = false;
        })

        // Rejected
        builder.addCase(fetchPost.rejected, (state, action)=>{
            state.posts = [];
            state.loading = false;
            state.error = action.payload;
        })
    },
})

// Generate Reducer
const fetchPostReducer = fetchPostSlice.reducer


// store
const store = configureStore({
    reducer: fetchPostReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
})

// dispatch
store.subscribe(()=>{
    console.log(store.getState())
})
store.dispatch(fetchPost())


