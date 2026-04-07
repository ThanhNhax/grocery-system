import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import inventoryController from '../controllers/inventory.controller.js'

const router = express.Router();
router.post("/movements", asyncHandler(inventoryController.createMovement));

export default router;
