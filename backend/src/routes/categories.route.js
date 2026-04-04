import express from "express";
import categoriesController from "../controllers/categories.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
router.get("/", asyncHandler(categoriesController.get));
router.get("/:id", asyncHandler(categoriesController.getById));
router.post("/", asyncHandler(categoriesController.create));
router.put("/:id", asyncHandler(categoriesController.udpate));
router.delete("/:id", asyncHandler(categoriesController.delete));

export default router;
