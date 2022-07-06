export type TransactionType = "deposit" | "withdraw" | "payment"

export interface ITransaction {
    id: number,
    amount: number,
    type: TransactionType,
    origin?: number,
    destination?: number | undefined,
    date: string
}
