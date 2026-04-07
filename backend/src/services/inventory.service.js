import pool from "../db/pool.js";
import inventoryRepository from "../repositories/inventoryRepository.js";
import { AppError } from "../utils/appError.js";
import productService from "./product.service.js";

const EnumTypeInventory = ["import", "export", "adjust"];

const createMovement = async ({ type, quantity, product_id, note }) => {
    if (!type || !EnumTypeInventory.includes(type)) {
        throw new AppError("Type is required", 400);
    }
    if (!Number(quantity) && !quantity > 0) {
        throw new AppError("Quantity is required", 400);
    }
    const existProduct = await productService.getById(product_id);

    if (!existProduct) {
        throw new AppError("Product not found", 400);
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        let updateProduct;
        switch (type) {
            case "import":
                updateProduct = await inventoryRepository.updateMovement({
                    client,
                    productId: product_id,
                    delta: quantity,
                });
                break;
            case "export":
                if ((existProduct.stock < quantity)) {
                    throw new AppError("Insufficient stock", 400);
                }
                updateProduct = await inventoryRepository.updateMovement({
                    client,
                    productId: product_id,
                    delta: -quantity,
                });
                break;
            case "adjust":
                updateProduct = await inventoryRepository.updateMovement({
                    client,
                    productId: product_id,
                    delta: quantity,
                });
                break;
            default:
                throw new AppError("Invalid movement type", 400);
        }
        const movement = await inventoryRepository.createMovement({
            client,
            product_id,
            type,
            quantity,
            note: note ?? null,
        });
        await client.query("COMMIT");

        return {
            movement,
            product: updateProduct,
        };
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

export default { createMovement };
