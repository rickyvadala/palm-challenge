import {ITransaction, IUser} from "../model";
import {useAppSelector} from "../store/hooks";
import {currentUserSelector} from "../store/slices/users";
import {transactionsSelector} from "../store/slices/fiat";
import {balanceCalculator} from "../utils/balanceCalculator";

export const useGetBalance = () => {
    const transactions: Array<ITransaction> = useAppSelector(transactionsSelector)
    const currentUser: IUser = useAppSelector(currentUserSelector)
    return balanceCalculator(transactions, currentUser.id)
}