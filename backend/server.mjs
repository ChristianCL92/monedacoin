import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

const credentials = {
    publishKey : process.env.PUBLISH_KEY,
    subscribeKey : process.env.SUBSCRIBE_KEY,
    secretKey : process.env.SECRET_KEY,
    userId : process.env.USER_ID,

}


const app = express();
app.use(express.json());



const PORT_DEFAULT = 4001;
let PORT_NODE;

if(process.env.CREATING_DYNAMIC_PORT === 'active'){ 
    PORT_NODE = PORT_DEFAULT + Math.ceil(Math.random() * 1000);
}

const PORT = PORT_NODE || PORT_DEFAULT;

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`)
});