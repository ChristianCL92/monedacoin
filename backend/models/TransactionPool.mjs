import Transaction from "./Transactions.mjs";

export default class TransactionPool {
  constructor() {
    this.pendingTransactions = {};
  }

  addTransaction(transaction) {
    this.pendingTransactions[transaction.id] = transaction;
  }

  transactionPoolBroadcast(pendingTransactions) {
    this.pendingTransactions = pendingTransactions;
  }

  emptyBlockTransactions({ chain }) {
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];

      for (let transaction of block.data) {
        if (this.pendingTransactions[transaction.id]) {
          delete this.pendingTransactions[transaction.id];
        }
      }
    }
  }

  emptyTransactions() {
    this.pendingTransactions = {};
  }

  transactionExists({ address }) {
    const transactions = Object.values(this.pendingTransactions);

    return transactions.find(
      (transaction) => transaction.inputMap.address === address
    );
  }

  validateTransactions() {
    return Object.values(this.pendingTransactions).filter((transaction) =>
      Transaction.validate(transaction)
    );
  }
}