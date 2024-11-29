const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("Tomato Farm Management Application", () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost/tomato_farm_test_db",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("GET /", () => {
    it("should respond with a status code", async () => {
      const response = await request(app).get("/login");
      expect(response.statusCode).toBe(200);
    });
  });
  describe("GET /login", () => {
    it("should respond with a status code", async () => {
      const response = await request(app).get("/login");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Error Handling", () => {
    it("should handle 404 routes", async () => {
      const response = await request(app).get("/nonexistent-route");
      expect(response.statusCode).toBe(404);
    });
  });
});
