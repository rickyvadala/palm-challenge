import {BigNumber} from "ethers";

export interface ICryptoTransaction {
    hash: number,
    value: string,
    from: string,
    to: string
}
