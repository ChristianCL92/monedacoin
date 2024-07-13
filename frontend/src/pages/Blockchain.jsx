import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react'
import Blocks from '../components/Blocks';

export const Blockchain = () => {

  const [blockchain, setBlockchain] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getBlockchain();
  }, [])

  const getBlockchain = async () => { 
    const response = await fetch('http://localhost:4001/api/v1/blockchain');

    if(response.ok) {
      const result = await response.json();
      console.log("Blockchain Data response:", result);
      setBlockchain(result.data);
      console.log("Blockchain Data:", blockchain);
      
      
    }
  }

  return (
    <>
      <div>
        <h2>MonedaCoin</h2>
        {blockchain.map((block) => (

          <Blocks key={block.hash} block={block}/>
        ))}
      </div>
    </>
  );
}

