import productService from "../services/product.service.js";
import { sendSuccess } from "../utils/response.js";

class Product {
    get = async (req, res) => {
        const products = await productService.getAll();

        return sendSuccess(res, {
            message: "Products fetched successfully",
            data: products,
        });
    };
    getById = async (req, res) => {
        const id = Number(req.params.id);
        console.log({id});
        const product = await productService.getById(id);
        return sendSuccess(res, {
            message: "Product fetched successfully",
            data: product,
        });
    };
    create = async (req, res) => {
        const product = await productService.create(req.body);
        return sendSuccess(res, {
            statusCode: 201,
            message: "Product created successfully",
            data: product,
        });
    };

    udpate = async (req, res) => {
        const id = Number(req.params.id);
        const product = await productService.update(id, req.body);

        return sendSuccess(res, {
            message: "Product updated successfully",
            data: product,
        });
    };

    delete = async (req, res) => {
        const id = Number(req.params.id);

        const product = await productService.remove(id);
        return sendSuccess(res, {
            message: "Product deleted successfully",
            data: product,
        });
    };
}

const products = [{ id: 0, name: "coca cola", price: 12, stock: 50 }];

export default new Product(products);
