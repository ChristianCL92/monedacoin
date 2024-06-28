import { INITIAL_BALANCE } from "../config/settings.mjs";
import { ellipticHash, generateHash } from "../utilities/crypto-lib.mjs";
import Transaction from "./Transactions.mjs";

export default class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ellipticHash.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }


  createTransaction({ recipient, amount }) {
    if (amount > this.balance) throw new Error('Not enough funds!');

    return new Transaction({ sender: this, recipient, amount });
  }

  sign(data) {
    return this.keyPair.sign(generateHash(data));
  }
}