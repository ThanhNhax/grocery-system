import request from "supertest";
import app from "../app";

describe("Categories Api", () => {
    test("should return Categories list", async () => {
        const res = await request(app).get("/categories");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    test("should create Categories successfully", async () => {
        const res = await request(app).post("/categories").send({
            name: "Test Categories",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("Categorie created successfully");
        expect(res.body.data.name).toBe("Test Categories");
    });

    test("should create Categories successfully faill name", async () => {
        const res = await request(app).post("/categories").send({
            name: "",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Name is required");
    });

    test("should update  Categories successfully", async () => {
        const created = await request(app).post("/categories").send({
            name: "Categories B"
        });

        const id = created.body.data.id;

        const res = await request(app).put(`/categories/${id}`).send({
            name: "Categories C",
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("Categorie updated successfully");
        expect(res.body.data.name).toBe("Categories C");
    });

    test("should update  Categories not id", async () => {

        const res = await request(app).put(`/categories/999999`).send({
            name: "Categories C",
        });

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Categories not found");
    });

    test('delete', async() => {
        const create = await request(app).post('/categories').send({
          name:"delete"
        })
        const id = create.body.data.id
        const res = (await request(app).delete(`/categories/${id}`))

        expect(res.statusCode).toBe(200)
        expect(res.status).toBe(200)
        expect(res.body.message).toBe("Categorie deleted successfully")
    });
    
});
