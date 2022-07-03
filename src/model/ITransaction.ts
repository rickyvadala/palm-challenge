import {IUser} from "./IUser";

export interface ITransaction {
    id: number,
    amount: number,
    accountFrom: IUser,
    accountTo: IUser,
    date: Date
}
