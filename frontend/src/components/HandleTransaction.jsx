import React from 'react'
import { Transaction } from '../pages/Transaction';


const HandleTransaction = () => {


      const transactionToMake = async (data) => {
        const token = localStorage.getItem("token");
        try {
                const response =  await fetch(
                'http://localhost:4001/api/v1/wallet/transaction',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify(data),
                }
              );

               if(!response.ok){
                console.error('Transaction failed:', response);
                throw new Error('Transaction failed');
              }

              console.log("TransactionData in handleTransaction fetch:", data);
               setTimeout(async() => {
                
                await fetch('http://localhost:4001/api/v1/wallet/mine');
              }, 2000); 
              console.log("data in handleTransaction fetch after mine:", data);

        } catch (error) {
            console.error('Transaction failed:', error);
            throw error;
        }
      
      };
  return (
    <div>
      <Transaction
        transactionToMake={transactionToMake}/>
    </div>
  );
}

export default HandleTransaction