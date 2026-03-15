import express from "express";
import prodcutController from "../controllers/prodcut.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
router.get("/", asyncHandler(prodcutController.get));
router.get("/:id", asyncHandler(prodcutController.getById));
router.post("/", asyncHandler(prodcutController.create));
router.put("/:id", asyncHandler(prodcutController.udpate));
router.delete("/:id", asyncHandler(prodcutController.delete));

export default router;
