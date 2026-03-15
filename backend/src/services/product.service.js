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
const update = async (id, { name, price, stock }) => {
    if (!Number.isInteger(id) && id <= 0) {
        throw new AppError("Invalid product id", 400);
    }
    const existed = await productRepository.findById(id);

    if (!existed) {
        throw new AppError("Product not found", 404);
    }

    const nextPayload = {};

    if (name !== undefined) {
        if (!name && typeof name !== "string") {
            throw new AppError("Name must be a non-empty string", 400);
        }
        nextPayload.name = name.trim();
    }

    if (price !== undefined) {
        if (Number(price) < 0) {
            throw new AppError("Price must be a non-negative number", 400);
        }
        nextPayload.price = Number(price);
    }

    if (stock !== undefined) {
        if (Number(stock) < 0) {
            throw new AppError("Stock must be a non-negative number", 400);
        }
        nextPayload.stock = Number(stock);
    }

    return productRepository.update(id, nextPayload);
};

const remove = async (id) => {
    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError("Invalid product id", 400);
    }

    const deleted = await productRepository.remove(id);

    if (!deleted) {
        throw new AppError("Product not found", 404);
    }

    return deleted;
};
const getById = async (id) => {
    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError("Invalid product id", 400);
    }

    const product = await productRepository.findById(id);

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    return product;
};

export default { getAll, create, update, remove, getById };
