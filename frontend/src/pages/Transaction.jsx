import React from 'react'
import { useState } from 'react'
import "../styles/Transaction.css"

export const Transaction = ({transactionToMake}) => {
const [amount, setAmount] = useState(0);
const [recipient, setRecipient] = useState('');
const [message, setMessage] = useState('');

const handleSubmit = async (e) => { 
  e.preventDefault();
  console.log("TransactionToMake", transactionToMake);
  const transactionData = {
    amount: Number(amount),
    recipient
  }
  console.log("Transaction Data:", transactionData);
  try {
      const data = await transactionToMake(transactionData);
      console.log("Data received in Transaction Component:", data);
      setMessage('Transaction successful!');
  } catch (error) {
    setMessage("Transaction failed!", error)
  }
console.log("Transaction Data:", transactionData);

}
 return (
   <>
     <div className='transaction-container'>
       <form className='transaction-form' onSubmit={handleSubmit}>
         <div>
           <label>Amount:</label>
           <input
             type="number"
             value={amount}
             onChange={(e) => setAmount(e.target.value)}
             required
           />
         </div>
         <div>
           <label>Recipient:</label>
           <input
             type="text"
             value={recipient}
             onChange={(e) => setRecipient(e.target.value)}
             required
           />
         </div>
         <button type="submit">Submit Transaction</button>
         {message && <div className="message">{message}</div>}
       </form>
     </div>
   </>
 );
}

