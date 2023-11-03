// console.log("Welcome to RTK")
const { createAction, nanoid, createReducer, configureStore } = require('@reduxjs/toolkit')
const logger = require('redux-logger').createLogger();


// Initial States
const initialState = {
    counter: 0,
}

// default Action creator
const increment = createAction('INCREMENT')
const decrement = createAction('DECREMENT');
const resetCounter = createAction('RESET');

// customize an Action creator
const incrementBy = createAction('INCREMENT_BY', (amount, user)=>{
    return {
        payload:{
            amount: amount,
            user: user,
            id: nanoid(),
        }
    }
});
// console.log(incrementBy(20, "Emmanuel"))

// Create Reducer
// 1. using the builder callback notation
const counterSlice = createReducer(initialState, (builder) => {
    // 4 increment
    builder.addCase(increment, (state)=>{
        state.counter += 1
    })

    // 4 decrement
    builder.addCase(decrement, (state)=>{
        state.counter -= 1
    });

    // 4 resetCounter
    builder.addCase(resetCounter, (state)=>{
        state.counter = 0
    });

    // 4 increment_by
    builder.addCase(incrementBy, (state, action)=>{
        state.counter += action.payload.amount
    });
})


// Store
const store =  configureStore({
    reducer: counterSlice,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
})


// dispatch action
store.dispatch(increment())
store.dispatch(increment())
store.dispatch(increment())
store.dispatch(increment())

// store.dispatch(decrement())

// store.dispatch(resetCounter())

store.dispatch(incrementBy(20, "Emmanuel"))

console.log(store.getState());



































// 2. using the map object notation
// const counterSlice2 =  createAction(initialState, {
//     [increment]: (state) => {
//         state.counter += 1;
//     },
//     [decrement]: (state) => {
//         state.counter -= 1;
//     },
//     [resetCounter]: (state) => {
//         state.counter = 0;
//     },
//     [incrementBy]: (state, action) => {
//         state.counter = action.payload.amount;
//     },
// })