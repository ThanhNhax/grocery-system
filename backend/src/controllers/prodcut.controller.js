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
    create = async (req, res) => {
        const product = await productService.create(req.body);
        return sendSuccess(res, {
            statusCode: 201,
            message: "Product created successfully",
            data: product,
        });
    };

    udpate = (req, res) => {
        const id = req.body.id;
        const exits = this.findIndex(id);
        if (exits === -1) {
            throw Error("id not found!");
        }
        this.product[exits] = { ...req.body };
        return res.status(201).json({ message: "Create successfully!" });
    };

    delete = (req, res) => {
        const id = req.params.id;
        console.log({ id });
        const exits = this.findIndex(id);
        if (exits === -1) {
            throw Error("id not found!");
        }
        this.product = this.product.filter((item) => item.id != id);
        console.log(this.product);
        return res.status(204).json({ message: "Delete successfully!" });
    };
    findIndex = (id) => {
        return this.product.findIndex((item) => item.id == id);
    };
}

const products = [{ id: 0, name: "coca cola", price: 12, stock: 50 }];

export default new Product(products);
