import mongoose from "mongoose";



const BlockSchema = new mongoose.Schema({
    index: Number,
    timestamp: Date,
    lastHash: String,
    hash: String,
    data: Array,
    difficulty: Number,
    nonce: Number,
    });

const BlockchainSchema = new mongoose.Schema({
    chain: [BlockSchema]
    });



export default mongoose.model("Blockchain", BlockchainSchema);
