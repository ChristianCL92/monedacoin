import { pubnubServer } from "../server.mjs";
import { blockchain } from "../server.mjs";


export const mineBlock = (req, res) => { 
    
    const data = req.body;
        
    const block = blockchain.addBlock({data : data});
    if(!block) {
        return res.status(400).json({success: false, statusCode: 400, error: "Failed to mine block"})
    }
    pubnubServer.broadcast();

    res.status(201).json({success: true, statusCode: 201, data: block})

}


