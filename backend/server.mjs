import express from 'express';
import dotenv from 'dotenv';
import {connectDb} from './config/mongoDB.mjs';
import morgan from 'morgan';
import cors from 'cors';
import Blockchain from './models/Blockchain.mjs';
import TransactionPool from './models/TransactionPool.mjs';
import Wallet from './models/Wallet.mjs';
import PubNubServer from './pubnubServer.mjs';
import blockchainRouter from './routes/blockchain-router.mjs';
import blockRouter from './routes/block-router.mjs';
import transactionRouter from "./routes/transaction-router.mjs"
import userRouter from './routes/user-auth-routes.mjs';
import errorHandler from './middleware/errorHandler.mjs';
 
dotenv.config({ path: './config/.env' });

connectDb();

const credentials = {
    publishKey : process.env.PUBLISH_KEY,
    subscribeKey : process.env.SUBSCRIBE_KEY,
    secretKey : process.env.SECRET_KEY,
    userId : process.env.USER_ID,
};

export const blockchain = new Blockchain();
export const transactionPool = new TransactionPool();
export const wallet = new Wallet();
export const pubnubServer = new PubNubServer({ 
  blockchain: blockchain,
   transactionPool: transactionPool,
    wallet: wallet,
    credentials: credentials, 
    });

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('dev'));

setTimeout(() => {
  pubnubServer.broadcast();
}, 1000);

app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/block', blockRouter); 
app.use('/api/v1/wallet', transactionRouter);
app.use('/api/v1/auth', userRouter);

app.use(errorHandler);

const PORT_DEFAULT = 4001;
const ROOT_NODE_ADDRESS = `http://localhost:${PORT_DEFAULT}`;
let PORT_NODE;

const synchronize = async () => {
  let response = await fetch(`${ROOT_NODE_ADDRESS}/api/v1/blockchain`);
  if (response.ok) {
    const result = await response.json();
    console.log('SYNC', result.data);
    blockchain.substituteChain(result.data);
  }

    response = await fetch(`${ROOT_NODE_ADDRESS}/api/v1/wallet/transactions`);
    if (response.ok) {
      const result = await response.json();
      transactionPool.transactionPoolBroadcast(result.data);
    }

};

if(process.env.CREATING_DYNAMIC_PORT === 'active'){ 
    PORT_NODE = PORT_DEFAULT + Math.ceil(Math.random() * 1000);
}

const PORT = PORT_NODE || PORT_DEFAULT;

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`)

    if (PORT !== PORT_DEFAULT) {
        synchronize();
    }
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});