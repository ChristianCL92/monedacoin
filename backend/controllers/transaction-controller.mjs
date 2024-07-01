import { transactionPool } from "../server.mjs";
import {wallet} from "../server.mjs";
import  { blockchain } from "../server.mjs";
import Miner from '../models/Miner.mjs';
import { pubnubServer } from "../server.mjs";
import Wallet from "../models/Wallet.mjs";

export const insertTransaction = (req, res) => {
    const {amount, recipient} = req.body;

    let transaction = transactionPool.transactionExists({
        address: wallet.publicKey
    });
    
    try {
      if (transaction) {
        transaction.update({ sender: wallet, recipient, amount });
      } else {
        transaction = wallet.performTransaction({ recipient, amount });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, error: error.message });
    }

    transactionPool.addTransaction(transaction)
    pubnubServer.broadcastTransaction(transaction)

    res.status(201).json({ success: true, statusCode: 201, data: transaction });
}


export const getWalletBalance = (req, res) => {
    const address = wallet.publicKey;
    const balance = Wallet.calculateBalance({
        chain: blockchain,
        address,
    })
    res.status(200).json({
        success: true,
        statusCode: 200,
        data: {address: address, balance: balance},
    })
}


export const getPendingTransactions = (req, res, next) => { 
    res.status(200).json({
        success: true,
         statusCode: 200,
          data: transactionPool.pendingTransactions
        })
}

export const mineTransactions = (req, res, next) => { 
    const miner = new Miner({
        blockchain,
        transactionPool,
         wallet,
        pubsub: pubnubServer
        });

        miner.mineTransaction();

        res.status(201).json({
            success: true,
             statusCode: 201,
              data: "fungerar hyfsat just nu"
            })
}


