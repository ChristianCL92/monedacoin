import express from "express";
import { mineBlock } from "../controllers/block-controller.mjs";
const router = express.Router();

router.get("/mine", mineBlock )

export default router;