import {configureStore} from "@reduxjs/toolkit";
import {usersSlice} from "./slices/users";

export const store = configureStore({
    reducer: {
        [usersSlice.name]: usersSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>