import React from 'react'
import { Transaction } from '../pages/Transaction';

const HandleTransaction = () => {
      const transactionToMake = async (transactionData) => {

        const token = localStorage.getItem("token");
        console.log("Token retreived from localstorage In handleTransaction:", token);
        try {
               await fetch(
                'http://localhost:4001/api/v1/wallet/transaction',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify(transactionData),
                }
              );

              await fetch('http://localhost:4001/api/v1/wallet/mine');

        } catch (error) {
            console.error('Transaction failed:', error);
        }
      
      };
  return (
    <div>
      <Transaction transactionToMake={transactionToMake} />
    </div>
  )
}

export default HandleTransaction