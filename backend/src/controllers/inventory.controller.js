import inventoryService from '../services/inventory.service.js'
import { sendSuccess } from "../utils/response.js";

class InventoryController {
    createMovement = async (req, res) => {
        const data = await inventoryService.createMovement(req.body);
        return sendSuccess(res, {
            statusCode: 201,
            message: "Inventory movement created successfully",
            data,
        });
    };
}

export default new InventoryController();
