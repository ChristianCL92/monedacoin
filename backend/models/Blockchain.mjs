import Block from "./Block.mjs";
import Transaction from "./Transactions.mjs";

export default class Blockchain {
    constructor() {
        this.chain = [Block.genesisBlock];
        this.pendingTransactions = [];
    }

    addBlock() {
        const newBlock = Block.createBlock( {
            lastBlock: this.chain.at(-1),
            data: this.pendingTransactions, 
        })

        this.pendingTransactions = [];
        this.chain.push(newBlock);

        return newBlock;
    }

    insertTransation() {
        const transaction = new Transaction(amount, sender, recipient);
        this.pendingTransactions.push(transaction);
        return transaction;
    }

    substituteChain(chain) {
     //Undviker att en kortare kedja ersätter en längre kedja
    if (chain.length <= this.chain.length) return;
   //Undviker att ersätta kedjan med en kedja som inte är giltig
    if (!Blockchain.validateChain(chain)) return;

    this.chain = chain;
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