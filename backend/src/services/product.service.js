import productRepository from "../repositories/product.repository.js";
import { AppError } from "../utils/appError.js";

const getAll = async () => {
    return productRepository.findAll();
};
const create = async ({ name, price, stock }) => {
    if (!name || typeof name !== "string") {
        throw new AppError("Name is required", 400);
    }
    if (price === undefined || Number(price) < 0) {
        throw new AppError("Price must be a non-negative number", 400);
    }
    if (stock === undefined || Number(price) < 0) {
        throw new AppError("Stock must be a non-negative number", 400);
    }
    return productRepository.create({
        name: name.trim(),
        price: Number(price),
        stock: Number(stock),
    });
};

export default { getAll, create };
