import {ITransaction} from "../model";

export const balanceCalculator = (transactions: Array<ITransaction>, userId: number) => {
    return transactions
        .filter((t: ITransaction) => t.origin === userId || t.destination === userId)
        .reduce((a: number, b: ITransaction) => {
            const increaseCondition = (t: ITransaction) => t.type === "deposit" || t.destination === userId
            return increaseCondition(b) ? a + b.amount : a - b.amount
        }, 0)
}