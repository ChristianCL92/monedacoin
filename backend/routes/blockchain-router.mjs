import express from "express";
import { getBlockchain, getMongoBlockchain } from "../controllers/blockchain-controller.mjs";

const router = express.Router();

router.get("/", getBlockchain);
router.get("/mongodb", getMongoBlockchain);

export default router;

