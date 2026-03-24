import categoriesService from "../services/categories.service.js";
import { sendSuccess } from "../utils/response.js";

class Categories {
    get = async (req, res) => {
        const products = await categoriesService.getAll();

        return sendSuccess(res, {
            message: "Categories fetched successfully",
            data: products,
        });
    };
    getById = async (req, res) => {
        const id = Number(req.params.id);
        const product = await categoriesService.getById(id);
        return sendSuccess(res, {
            message: "Categorie fetched successfully",
            data: product,
        });
    };
    create = async (req, res) => {
        const product = await categoriesService.create(req.body);
        return sendSuccess(res, {
            statusCode: 201,
            message: "Categorie created successfully",
            data: product,
        });
    };

    udpate = async (req, res) => {
        const id = Number(req.params.id);
        const product = await categoriesService.update(id, req.body);

        return sendSuccess(res, {
            message: "Categorie updated successfully",
            data: product,
        });
    };

    delete = async (req, res) => {
        const id = Number(req.params.id);

        const product = await categoriesService.remove(id);
        return sendSuccess(res, {
            message: "Categorie deleted successfully",
            data: product,
        });
    };
}


export default new Categories();
