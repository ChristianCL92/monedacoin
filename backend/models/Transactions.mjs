import{ v4 as uuidv4 } from 'uuid';
import { verifySignature } from '../utilities/crypto-lib.mjs';
import { REWARD_ADDRESS, MINING_REWARD } from '../config/settings.mjs';

export default class Transaction {
  constructor({sender, recipient, amount, inputMap, outputMap}) {
    this.id = uuidv4().replaceAll('-', '');
    this.outputMap = outputMap || this.outputMapCreate({sender, recipient, amount});
    this.inputMap = inputMap || this.inputMapCreate({sender, outputMap: this.outputMap});
  }

  static rewardTransaction({miner}) {
    return new this({
      inputMap: REWARD_ADDRESS,
      outputMap: {
        [miner.publicKey]: MINING_REWARD
      }
    })
  }

  static validate(transaction) {
    const {
      inputMap: {amount, address, signature},
      outputMap,
    } = transaction;

    console.log("OUTPUTMAP:",outputMap);
    console.log("AMOUNT:",amount);

    const outputTotal = Object.values(outputMap).reduce(
      (total, amount) => total + amount

    );
console.log("OUTPUT TOTAL:",outputTotal);
    if(amount !== outputTotal){
      console.log("Inside VALIDATE TRANSACTION FIRST IF")
    return false;
    } 
      
      
    
    if(!verifySignature({publicKey: address, data: outputMap, signature})){
      console.log("Inside VALIDATE SECOND IF ");
      return false;
    }
      
      

    return true;
  }

  update({sender, recipient, amount}) {
    if(amount > this.outputMap[sender.publicKey] ) {
      throw new Error('Amount exceeds balance');
    }

    if(!this.outputMap[recipient]) {
      this.outputMap[recipient] = amount;
    } else {
      this.outputMap[recipient] = this.outputMap[recipient] + amount;
    }

    this.outputMap[sender.publicKey] =
    this.outputMap[sender.publicKey] - amount;

    this.inputMap = this.inputMapCreate({ sender, outputMap: this.outputMap });

  }

  outputMapCreate({sender, recipient, amount}) {
    const outputMap = {};
    outputMap[recipient] = amount;
    outputMap[sender.publicKey] = sender.balance - amount;

    return outputMap;
  }

  inputMapCreate({sender, outputMap}) {
   return {
    timestamp: Date.now(),
    amount: sender.balance,
    address: sender.publicKey,
    signature: sender.sign(outputMap)
   }
  }
 
}