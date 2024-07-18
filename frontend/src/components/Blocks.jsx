import React from 'react'
import TransactionData from './TransactionData'
import "../styles/App.css"

const Blocks = ({block}) => {
  return (
    <>
      <div className='block'>
        <h3>Block:{block.index}</h3>
        <p>Timestamp:{new Date(block.timestamp).toLocaleTimeString()}</p>
        <p>Last Hash:{block.lastHash.slice(0, 15)}...</p>
        <p>Hash:{block.hash.slice(0, 15)}...</p>
        <p>Nonce:{block.nonce}</p>
        <p>Difficulty:{block.difficulty}</p>
        <h5>Transaction data</h5>
        {block.data.map((transaction) => (
          < TransactionData key={transaction.id} transaction={transaction}/>
        ))}
      </div>
    </>
  )
}

export default Blocks