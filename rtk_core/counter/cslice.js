const { createSlice, configureStore } = require('@reduxjs/toolkit');
const logger = require('redux-logger').createLogger();

// Initial States
const initialState = {
    counter: 0,
}

// createSlice
const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers:{
        increment: (state) => {
            state.counter += 1;
        },
        decrement: (state) => {
            state.counter -= 1;
        },
        resetCounter: (state) => {
            state.counter += 0;
        },
        incrementBy: (state, action) => {
            state.counter += action.payload;
        },
    }
})

// Generation Actions
const {decrement, increment, resetCounter, incrementBy} = counterSlice.actions;

// Generate Reducer
const counterReducer = counterSlice.reducer;

// Our store
const store = configureStore({
    reducer: counterReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
})

// Dispatch
store.dispatch(increment())
store.dispatch(increment())
store.dispatch(increment())

store.dispatch(incrementBy(20))

console.log(store.getState())