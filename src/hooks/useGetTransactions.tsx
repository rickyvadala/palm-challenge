import {ITransaction} from "../model";
import {useAppSelector} from "../store/hooks";
import {currentUserSelector} from "../store/slices/users";
import {transactionsSelector} from "../store/slices/fiat";

export const useGetTransactions = () => {
    const transactions: Array<ITransaction> = useAppSelector(transactionsSelector)
    const {id} = useAppSelector(currentUserSelector)
    return transactions.filter((t: ITransaction) => t.origin === id || t.destination === id)
}