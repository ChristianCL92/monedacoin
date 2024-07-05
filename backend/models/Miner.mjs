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
    validTransactions.push(Transaction.rewardTransaction({ miner: this.wallet }) );
    this.blockchain.addBlock({ data: validTransactions });
    this.pubsub.broadcast();
    this.transactionPool.emptyTransactions();
  }
}
