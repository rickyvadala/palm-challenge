import {configureStore} from "@reduxjs/toolkit";
import {usersSlice} from "./slices/users";
import {fiatSlice} from "./slices/fiat";

export const store: any = configureStore({
    reducer: {
        [usersSlice.name]: usersSlice.reducer,
        [fiatSlice.name]: fiatSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch
// @ts-ignore
export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store