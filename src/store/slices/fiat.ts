import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {ITransaction} from "../../model";
import {balanceCalculator as bc} from "../../utils/balanceCalculator";
import {serializedDate} from "../../utils/dateUtils";

let singletonId = 6
const idGenerator = () => ++singletonId
const balanceCalculator = bc
const initialState = {
    transactions: [
        {
            id: 1,
            amount: 500,
            origin: 1,
            type: "deposit",
            date: serializedDate()
        },
        {
            id: 2,
            amount: 10,
            origin: 1,
            type: "withdraw",
            date: serializedDate()
        },
        {
            id: 3,
            amount: 50,
            origin: 1,
            destination: 2,
            type: "payment",
            date: serializedDate()
        },
        {
            id: 4,
            amount: 100,
            origin: 1,
            destination: 2,
            type: "payment",
            date: serializedDate()
        },
        {
            id: 5,
            amount: 5000,
            origin: 2,
            type: "deposit",
            date: serializedDate()
        },
        {
            id: 6,
            amount: 100,
            origin: 2,
            destination: 1,
            type: "payment",
            date: serializedDate()
        },
    ] as Array<ITransaction>
}

export const fiatSlice = createSlice({
    name: 'fiat',
    initialState,
    reducers: {
        deposit: (state, {payload}) => {
            const deposit: ITransaction = {
                id: idGenerator(),
                type: "deposit",
                amount: payload.amount,
                origin: payload.origin,
                date: serializedDate()
            }

            state.transactions.push(deposit)
        },
        withdraw: (state: RootState, {payload}) => {
            const nextAmount = balanceCalculator(state.transactions, payload.origin) - payload.amount
            if (nextAmount >= 0) {
                const withdraw: ITransaction = {
                    id: idGenerator(),
                    type: "withdraw",
                    amount: payload.amount,
                    origin: payload.origin,
                    date: serializedDate()
                }

                state.transactions.push(withdraw)
            } else {
                throw Error(`You don't have the funds to cover this withdraw`)
            }
        },
        pay: (state, {payload}) => {
            const nextAmount = balanceCalculator(state.transactions, payload.origin) - payload.amount
            if (nextAmount >= 0) {
                const payment: ITransaction = {
                    id: idGenerator(),
                    type: "payment",
                    amount: payload.amount,
                    origin: payload.origin,
                    destination: payload.destination,
                    date: serializedDate()
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