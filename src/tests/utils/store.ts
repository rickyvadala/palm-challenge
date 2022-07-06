import {configureStore} from '@reduxjs/toolkit';
import {ITransaction, IUser} from "../../model";
import {RootState} from "../../store/store";
import {usersSlice} from "../../store/slices/users";
import {fiatSlice} from "../../store/slices/fiat";

export function createTestStore() {
    return configureStore({
        reducer: {
            [usersSlice.name]: usersSlice.reducer,
            [fiatSlice.name]: fiatSlice.reducer
        },
    });
}

export const initialState: RootState = {
    [fiatSlice.name]: {
        transactions: [
            {
                id: 1,
                amount: 500,
                origin: 1,
                type: "deposit"
            },
            {
                id: 2,
                amount: 10,
                origin: 1,
                type: "withdraw"
            },
            {
                id: 3,
                amount: 50,
                origin: 1,
                destination: 2,
                type: "payment"
            },
            {
                id: 4,
                amount: 100,
                origin: 1,
                destination: 2,
                type: "payment"
            },
            {
                id: 5,
                amount: 5000,
                origin: 2,
                type: "deposit"
            },
            {
                id: 6,
                amount: 100,
                origin: 2,
                destination: 1,
                type: "payment"
            },
        ] as Array<ITransaction>
    },
    [usersSlice.name]: {
        currentUser: {} as IUser,
        allUsers: [
            {
                id: 1,
                username: "ricky",
                password: "ricky"
            }
        ] as Array<IUser>
    }
}