import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {ITransaction} from "../../model";

const initialState = {
    transactions: [
        {
            id: 1,
            amount: 500,
            type: "deposit"
        },
        {
            id: 2,
            amount: 10,
            type: "withdraw"
        },
        {
            id: 3,
            amount: 50,
            userFrom: 1,
            userTo: 2,
            type: "payment"
        },
        {
            id: 4,
            amount: 100,
            userFrom: 1,
            userTo: 2,
            type: "payment"
        },
    ] as Array<ITransaction>
}

const backendAmountCalculator = (state: RootState) => {
    return state.fiat.transactions
        .filter((t: ITransaction) => {
            return t.userTo === 1 || t.userFrom === 1 || t.type !== "payment"
        })
        .reduce((a: number, b: ITransaction) => {
            return b.type === "deposit"
                ? a + b.amount
                : a - b.amount
        }, 0)
}

export const fiatSlice = createSlice({
    name: 'fiat',
    initialState,
    reducers: {
        deposit: (state, {payload}) => {
            const deposit: ITransaction = {
                id: 0,
                type: "deposit",
                amount: payload
            }
            state.transactions.push(deposit)
        },
        withdraw: (state: RootState, {payload}) => {
            const nextAmount = backendAmountCalculator(state) - payload
            if (nextAmount >= 0) {
                const withdraw: ITransaction = {
                    id: 0,
                    type: "withdraw",
                    amount: payload
                }

                state.transactions.push(withdraw)
            } else {
                throw Error(`You don't have the funds to cover this withdraw`)
            }
        },
        pay: (state, {payload}) => {
            const nextAmount = backendAmountCalculator(state) - payload
            if (nextAmount >= 0) {
                const payment: ITransaction = {
                    id: 0,
                    type: "payment",
                    amount: payload.amount,
                    userFrom: payload.userFrom,
                    userTo: payload.userTo
                }

                state.transactions.push(payment)
            } else {
                throw Error(`You don't have the funds to cover this payment`)
            }
        }
    }
})

export const {deposit, withdraw, pay} = fiatSlice.actions
export const transactionsSelector = (state: RootState) => state.fiat.transactions
export const amountSelector = (state: RootState) => backendAmountCalculator(state)
