export interface ICryptoTransaction {
    hash: number,
    value: string,
    from: string,
    to: string,
    timestamp?: number
}
