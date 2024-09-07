import { configureStore } from "@reduxjs/toolkit"
import { createLogger } from "redux-logger"
import userReducer from "./slices/userSlice"
import todoReducer from "./slices/todoSlice";
import adminReducer from "./slices/adminSlice";

const preloadedState = localStorage.getItem("reduxState")
    ? JSON.parse(localStorage.getItem("reduxState"))
    : {};

const logger = createLogger();

const store = configureStore({
    reducer: {
        user: userReducer,
        todos: todoReducer,
        admin: adminReducer
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(logger)
    },
    preloadedState
});

store.subscribe(() => {
    console.log("state =>",store.getState());
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
})

export default store;