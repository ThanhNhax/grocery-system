import  categoriesRepository from "../repositories/categories.repository.js";
import { AppError } from "../utils/appError.js";

const getAll = async () => {
    return  categoriesRepository.findAll();
};
const create = async ({ name }) => {
    if (!name || typeof name !== "string") {
        throw new AppError("Name is required", 400);
    }
    return  categoriesRepository.create({
        name: name.trim(),
    });
};
const update = async (id, { name}) => {
    if (!Number.isInteger(id) && id <= 0) {
        throw new AppError("Invalid categories id", 400);
    }
    const existed = await  categoriesRepository.findById(id);

    if (!existed) {
        throw new AppError("Categories not found", 404);
    }

    const nextPayload = {};

    if (name !== undefined) {
        if (!name && typeof name !== "string") {
            throw new AppError("Name must be a non-empty string", 400);
        }
        nextPayload.name = name.trim();
    }

    return  categoriesRepository.update(id, nextPayload);
};

const remove = async (id) => {
    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError("Invalid product id", 400);
    }

    const deleted = await  categoriesRepository.remove(id);

    if (!deleted) {
        throw new AppError("Categories not found", 404);
    }

    return deleted;
};
const getById = async (id) => {
    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError("Invalid categorie id", 400);
    }

    const product = await  categoriesRepository.findById(id);

    if (!product) {
        throw new AppError("categorie not found", 404);
    }

    return product;
};

export default { getAll, create, update, remove, getById };
