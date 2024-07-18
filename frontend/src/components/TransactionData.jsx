import React from 'react'
import "../styles/App.css"

const TransactionData = ({transaction}) => {

  const { inputMap, outputMap } = transaction;
  const outputKeys = Object.keys(outputMap);
  const outputValues = Object.values(outputMap);
  return (
    <>
      <div className="transaction">
        <h6>Transaction ID: {transaction.id}</h6>
        <p>Recipient:{outputKeys[0].slice(0, 30)}...</p>
{transaction.inputMap.address === "authorized-reward-address" ? (
    <p>Reward amount: {outputValues[0]}</p>
) : (
    <p>Sent: {outputValues[0]}</p>
)}

        {inputMap.amount && <p>Initial Balance:{inputMap.amount}</p>}
        <p>Sender Address: {inputMap.address.slice(0, 30)}...</p>
      </div>   
    </>
  );
}

export default TransactionData