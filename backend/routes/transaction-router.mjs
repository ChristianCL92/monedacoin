import express from "express";
import  {
    insertTransaction,
     getPendingTransactions,
     getWalletBalance,
    mineTransactions
    } 
     from "../controllers/transaction-controller.mjs";
import protect from "../middleware/authorization.mjs";
 
const router = express.Router();

router.route('/transaction').post( protect, insertTransaction);
router.route("/transactions").get(getPendingTransactions);
router.route("/mine").get(mineTransactions);
router.route("/balance").get(getWalletBalance);



export default router;