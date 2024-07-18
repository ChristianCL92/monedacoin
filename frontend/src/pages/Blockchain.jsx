import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react'
import Blocks from '../components/Blocks';
import "../styles/App.css"

export const Blockchain = () => {

  const [blockchain, setBlockchain] = useState([]);

  useEffect(() => {
    getBlockchain();
  }, [])

  const getBlockchain = async () => { 
    const response = await fetch('http://localhost:4001/api/v1/blockchain');

    if(response.ok) {
      const result = await response.json();
      setBlockchain(result.data);
      
    }
  }

  return (
    <>
      <div className='blockchain'>
        <h2>MonedaCoin</h2>
        {blockchain.map((block) => (

          <Blocks key={block.hash} block={block}/>
        ))}
      </div>
    </>
  );
}

