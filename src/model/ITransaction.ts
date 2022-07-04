export type TransactionType = "deposit" | "withdraw" | "payment"

export interface ITransaction {
    id: number,
    amount: number,
    type: TransactionType,
    userFrom?: number | undefined,
    userTo?: number | undefined
}
