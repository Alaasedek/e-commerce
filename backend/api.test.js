// api.test.js
const request = require("supertest");
const app = require("./index"); // Assuming your Express app is defined in index.js

describe("POST /products", () => {
  test("It should create a new product", async () => {
    const response = await request(app)
      .post("/products")
      .send({ name: "Test Product", price: 10.99 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test Product");
    expect(response.body.price).toBe(10.99);
  });
});

describe("GET /products", () => {
  test("It should return a list of products", async () => {
    const response = await request(app).get("/products");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
