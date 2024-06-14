import express from 'express';
import dotenv from 'dotenv';
import Blockchain from './models/Blockchain.mjs';
import blockchainRouter from './routes/blockchain-router.mjs';

dotenv.config({ path: './config/.env' });

const credentials = {
    publishKey : process.env.PUBLISH_KEY,
    subscribeKey : process.env.SUBSCRIBE_KEY,
    secretKey : process.env.SECRET_KEY,
    userId : process.env.USER_ID,

}

export const blockchain = new Blockchain();

const app = express();
app.use(express.json());
app.use('/api/v1/blockchain', blockchainRouter);



const PORT_DEFAULT = 4001;
let PORT_NODE;

if(process.env.CREATING_DYNAMIC_PORT === 'active'){ 
    PORT_NODE = PORT_DEFAULT + Math.ceil(Math.random() * 1000);
}

const PORT = PORT_NODE || PORT_DEFAULT;

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`)
});