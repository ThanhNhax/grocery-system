import request from "supertest";
import app from "../app";

describe("Product Api", () => {
    test("should return product list", async () => {
        const res = await request(app).get("/products");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    test("should create product successfully", async () => {
        const res = await request(app).post("/products").send({
            name: "Test Product",
            price: 1000,
            stock: 10,
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("Product created successfully");
        expect(res.body.data.name).toBe("Test Product");
        expect(res.body.data.price).toBe(1000);
        expect(res.body.data.stock).toBe(10);
    });

    test("should create product successfully faill name", async () => {
        const res = await request(app).post("/products").send({
            name: "",
            price: 1000,
            stock: 10,
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Name is required");
    });

    test("should create product successfully faill price < 0", async () => {
        const res = await request(app).post("/products").send({
            name: "Test Product",
            price: -1000,
            stock: 10,
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Price must be a non-negative number");
    });

    test("should update  product successfully", async () => {
        const created = await request(app).post("/products").send({
            name: "Product B",
            price: 9000,
            stock: 3,
        });

        const id = created.body.data.id;

        const res = await request(app).put(`/products/${id}`).send({
            price: 1000,
            stock: 10,
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("Product updated successfully");
        expect(res.body.data.price).toBe(1000);
        expect(res.body.data.stock).toBe(10);
    });

    test("should update  product not id", async () => {

        const res = await request(app).put(`/products/999999`).send({
            price: 1000,
            stock: 10,
        });

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Product not found");
    });

    test("should update  product id < 0", async () => {

        const res = await request(app).put(`/products/-1`).send({
            price: 1000,
            stock: 10,
        });

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Product not found");
    });

    test('delete', async() => {
        const create = await request(app).post('/products').send({
          name:"delete",
          price:1,
          stock:1
        })
        const id = create.body.data.id
        const res = (await request(app).delete(`/products/${id}`))

        expect(res.statusCode).toBe(200)
        expect(res.status).toBe(200)
        expect(res.body.message).toBe("Product deleted successfully")
    });
    
});
