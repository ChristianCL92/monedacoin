import { generateHash } from '../utilities/crypto-lib.mjs';
import { MINING_REWARD, REWARD_ADDRESS } from '../config/settings.mjs';
import Block from './Block.mjs';
import Transaction from './Transactions.mjs';
export default class Blockchain {
  constructor() {
    this.chain = [Block.genesisBlock];
  }

  async addBlock({data}) {
    
    const newBlock = Block.createBlock({
      lastBlock: this.chain.at(-1),
      data: data,
      
    });

    this.chain.push(newBlock);
    return newBlock;
  }


  substituteChain(chain, shouldValidate, onSuccess) {
    //Undviker att en kortare kedja ersätter en längre kedja
    if (chain.length <= this.chain.length) return;
    //Undviker att ersätta kedjan med en kedja som inte är giltig
    if (!Blockchain.validateChain(chain)) return;

    if (shouldValidate && !this.validateTransactionData({ chain })) return;

    if (onSuccess) onSuccess();

    this.chain = chain;
  }



  validateTransactionData({ chain}) {
    for( let i = 1; i < chain.length; i++) { 
      let block = chain[i];
      const transactionSet = new Set();
      let counter = 0;

      for(let transaction of block.data) {

        if(transaction.inputMap.address === REWARD_ADDRESS.address) {
          counter++;
          if(counter > 1) return false;
          if(Object.values(transaction.outputMap)[0] !== MINING_REWARD) 
            return false;
        } else{
          if (!Transaction.validate(transaction)) return false;

          if(transactionSet.has(transaction)) return false;
          else{
            transactionSet.add(transaction);
          }
        }

        
      }
    }


    return true
  }

  static validateChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesisBlock))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, data, nonce, difficulty } =
        chain.at(i);

      const currentLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;

      if (lastHash !== currentLastHash) return false;

      if (Math.abs(lastDifficulty - difficulty) > 1) return false;

      const correctHash = generateHash(
        timestamp,
        lastHash,
        data,
        nonce,
        difficulty
      );
      if (hash !== correctHash) return false;
    }

    return true;
  }
}
