import Transaction from './Transactions.mjs';

export default class Miner {
  constructor({ blockchain, wallet, transactionPool, pubsub }) {
    this.blockchain = blockchain;
    this.wallet = wallet;
    this.transactionPool = transactionPool;
    this.pubsub = pubsub;
  }

  mineTransaction() {
   const validTransactions = this.transactionPool.validateTransactions();
    if(this.blockchain.chain.length > 1) {
      const rewardTransaction = Transaction.rewardTransaction({miner: this.wallet,});
      validTransactions.push(rewardTransaction);
 }
 
    this.blockchain.addBlock({ data: validTransactions });
    this.pubsub.broadcast();
    this.transactionPool.emptyTransactions();
    
if (this.blockchain.chain.length > 0) {
  const rewardTransaction = Transaction.rewardTransaction({
    miner: this.wallet,
  });
  this.transactionPool.addTransaction(rewardTransaction);
  this.pubsub.broadcastTransaction(rewardTransaction);

}

  }
}
