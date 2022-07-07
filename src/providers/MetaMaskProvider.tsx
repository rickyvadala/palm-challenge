import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {openNotification} from "../components/atom/Notification";
import {ethers} from "ethers";

const ETHERSCAN_API_KEY = "CTSIGVKDDR2ZJC8K5CA1SIJ32EC2R35EBB"

type MetaMaskContextTypes = {
    ethereum: any;
    isConnected: boolean;
    connectedAccount: string;
    accountBalance: string | undefined;
    connectAccount: () => void;
    transfer: (amount: string, address: string) => any;
    getTransactions: (address: string) => any;
};

const MetaMaskAccountContext = createContext<MetaMaskContextTypes>({
    ethereum: null,
    isConnected: false,
    connectedAccount: '',
    accountBalance: '',
    connectAccount: () => {
    },
    transfer: () => {
    },
    getTransactions: () => {
    },
});

type ProviderProps = {
    children?: ReactNode;
};

const MetaMaskAccountProvider = ({children}: ProviderProps) => {
    const [ethereum, setEthereum] = useState<any>(null);
    const [connectedAccount, setConnectedAccount] = useState<MetaMaskContextTypes['connectedAccount']>('');
    const [balance, setBalance] = useState<MetaMaskContextTypes['accountBalance']>();

    const setEthereumFromWindow = async () => {
        if (window.ethereum) {
            // Reload if chain changes
            window.ethereum.on('chainChanged', () => window.location.reload());

            window.ethereum.on('message', (message: any) => {
                console.log("message listener: ", message)
                message.wait((res: any)=> console.log('res: ', res), 1000)
            });

            // Reload if account changes
            window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
                window.location.reload()
            });

            const chainId = await window.ethereum.request({method: 'eth_chainId'});
            const kovanId = '0x2a'; // See <https://docs.metamask.io/guide/ethereum-provider.html#chain-ids>
            if (chainId === kovanId) {
                setEthereum(window.ethereum);
            } else {
                openNotification({description: "Please use Kovan testnet"});
            }
        }
    }

    const handleAccounts = (accounts: string[]) => {
        if (accounts.length > 0) {
            const account = accounts[0];
            setConnectedAccount(account);
        } else {
            console.log("No authorized accounts yet")
        }
    };

    const getConnectedAccount = async () => {
        if (ethereum) {
            const accounts = await ethereum.request({method: 'eth_accounts'});
            if (accounts && Array.isArray(accounts)) {
                handleAccounts(accounts);
            }
        }
    };

    const connectAccount = async () => {
        if (!ethereum) {
            return;
        }
        try {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            if (accounts && Array.isArray(accounts)) {
                handleAccounts(accounts);
            }
        } catch (e) {
            throw e
        }
    };

    const getAccountBalance = async () => {
        if (ethereum && connectedAccount) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const ethBalance = await provider.getBalance(connectedAccount)
            return ethers.utils.formatEther(ethBalance)
        }
    };

    const transfer = (amount: string, address: string) => {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        ethers.utils.getAddress(address)
        return signer.sendTransaction({
            to: address,
            value: ethers.utils.parseEther(amount)
        })
    }

    const getTransactions = (address: string) => {
        let etherscanProvider = new ethers.providers.EtherscanProvider("kovan", ETHERSCAN_API_KEY);
        return etherscanProvider.getHistory(address)
    }

    useEffect(() => {
        void setEthereumFromWindow();
    }, []);

    useEffect(() => {
        void getConnectedAccount();
        getAccountBalance().then(res => {
            setBalance(res);
        })
    }, [ethereum, connectedAccount]);

    const value = {
        ethereum,
        isConnected: Boolean(connectedAccount),
        connectedAccount,
        accountBalance: balance,
        connectAccount,
        transfer,
        getTransactions,
    };

    return (
        <MetaMaskAccountContext.Provider value={value}>
            {children}
        </MetaMaskAccountContext.Provider>
    )
}

export const useMetaMaskAccount = () => {
    return useContext(MetaMaskAccountContext);
}

export default MetaMaskAccountProvider;
