import Transaction from './Transactions.mjs';

export default class Miner {
  constructor({ blockchain, wallet, transactionPool, pubsub }) {
    this.blockchain = blockchain;
    this.wallet = wallet;
    this.transactionPool = transactionPool;
    this.pubsub = pubsub;
  }

  mineTransaction() {
    console.log("Pending Transactions", this.transactionPool.pendingTransactions);
   const validTransactions = this.transactionPool.validateTransactions();
   console.log("Valid Transactions", validTransactions);
    //validTransactions.push(Transaction.rewardTransaction({ miner: this.wallet }) );
    if(this.blockchain.chain.length > 1) {
      const rewardTransaction = Transaction.rewardTransaction({miner: this.wallet,});
      validTransactions.push(rewardTransaction);
 }
 
    this.blockchain.addBlock({ data: validTransactions });
 console.log("Transactions to be added to the block", validTransactions);   
    this.pubsub.broadcast();
    this.transactionPool.emptyTransactions();
    
    //const rewardTransaction = Transaction.rewardTransaction({miner: this.wallet,});
    //this.transactionPool.addTransaction(rewardTransaction);

if (this.blockchain.chain.length > 0) {
  const rewardTransaction = Transaction.rewardTransaction({
    miner: this.wallet,
  });
  this.transactionPool.addTransaction(rewardTransaction);
  this.pubsub.broadcastTransaction(rewardTransaction);

}

  }
}
