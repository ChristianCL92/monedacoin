import { GENESIS_DATA, MINE_RATE } from "../config/settings.mjs";
import { generateHash } from "../utilities/crypto-lib.mjs";
import hexToBinary from "hex-to-binary";

export default class Block {
    constructor({timestamp, index, lastHash, hash, data, difficulty, nonce}) {
        this.timestamp = timestamp;
        this.index = index;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.difficulty = difficulty;
        this.nonce = nonce;

    }

    static get genesisBlock() {
        return new this(GENESIS_DATA)
    }

 static createBlock({lastBlock, data}) {
     const lastHash = lastBlock.hash;
    let {difficulty} = lastBlock;
    let hash, timestamp, index
    let nonce = 0;

    do {
        nonce++;
        timestamp = Date.now();
        index = lastBlock.index + 1;
        difficulty = Block.adjustDifficulty({block: lastBlock, timestamp})
        hash = generateHash(timestamp, lastHash, data, nonce, difficulty)
    } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({
        timestamp,
        index,
        lastHash,
        data,
        difficulty,
        nonce,
        hash
    })

 }

 static adjustDifficulty({block, timestamp}) {
        const {difficulty} = block;

        if(difficulty < 1) return 1;

        if(timestamp - block.timestamp > MINE_RATE) return difficulty - 1;
        return difficulty + 1;
 }
 
 
}