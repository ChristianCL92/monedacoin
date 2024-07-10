import { blockchain } from "../server.mjs";
import BlockchainModel from '../models/BlockchainMongooseModel.mjs';


export const getBlockchain = async (req, res) => { 
    
res.status(200).json({success: true, statusCode: 200, data: blockchain.chain})
}
  


export const getMongoBlockchain = async (req, res) => { 

     try {
       let existingBlockchain = await BlockchainModel.findOneAndUpdate();
       if (existingBlockchain) {
         existingBlockchain.chain = blockchain.chain;
         await existingBlockchain.save();
       } else {
         const newBlockchain = new BlockchainModel({ chain: blockchain.chain });
         await newBlockchain.save();
       }

       console.log('BLOCKCHAIN UPDATED IN MONGODB:', blockchain.chain);

       res.status(200).json({
         success: true,
         statusCode: 200,
         data: existingBlockchain.chain,
       });
     } catch (error) {
       console.error('Failed to update blockchain in MongoDB:', error);
       res.status(500).json({
         success: false,
         statusCode: 500,
         message: 'Failed to update blockchain in MongoDB',
       });
     }
}
