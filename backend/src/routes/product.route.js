import express from "express"
import prodcutController from "../controllers/prodcut.controller.js"
const router = express.Router()
router.get('/',prodcutController.get)
router.post('/',prodcutController.create)
router.put('/',prodcutController.udpate)
router.delete('/:id',prodcutController.delete)

export default router