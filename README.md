# Palm Challenge

This project was created with [Create React App](https://github.com/facebook/create-react-app) by Ricky Vadala.

## Content

### Login

**Available users:** \
There are already some users & transactions in the store

```json
[
  {
    "id": 1,
    "username": "ricky",
    "password": "ricky"
  },
  {
    "id": 2,
    "username": "palm",
    "password": "palm"
  }
]
```

### Register

You can register any username that is not already registered

```json
{
    "username": "other",
    "password": "other"
}
```

### Home

You can choose between a **Fiat Wallet** or a **Crypto Wallet** 
>NOTES: 
> - If you choose crypto, you need to have [MetaMask](https://metamask.io/download/) extension installed.
> - The first time you connect to your MetaMask wallet the page is going to reload, and you should log in again.
> - If you change your MetaMask wallet the page is going to reload, and you should log in again.

### Fiat Wallet

You can see the balance, all the transactions from/to your user and make new transactions like "Deposit", "Withdraw" and "Payment" <br/>
>NOTE: The destination of a payment should be an existing user.id

### Crypto Wallet (Optional)

You can see the balance, all the transactions from/to your address and make new payments to other address <br/>
>NOTES:
>- This was developed to use Kovan testnet (KETH)
>- If you need some KETH tokens to try the app, here is a [Faucet](https://faucet.paradigm.xyz/). Just put you address over there and claim
>- The destination of a payment should be a valid address

## Redux Database 

Used redux state management to emulate a DB as the challenge suggests.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\


