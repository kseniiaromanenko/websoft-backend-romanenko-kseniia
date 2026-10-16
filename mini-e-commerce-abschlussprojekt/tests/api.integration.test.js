import "dotenv/config";
import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../src/app.js";

describe("Öffentliche API-Endpunkte", () => {
  it("GET /api/health gibt 200 und status ok zurück", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("GET /api/categories gibt 200 und ein Array zurück", async () => {
    const response = await request(app).get("/api/categories");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("ungültige categoryId gibt 400 zurück", async () => {
    const response = await request(app).get("/api/products?categoryId=abc");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Ungültige Kategorie-ID",
    });
  });

  it("POST /api/orders ohne Token gibt 401 zurück", async () => {
    const response = await request(app).post("/api/orders").send({
      items: [],
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: "Nicht autorisiert",
    });
  });

  it("unbekannter Endpoint gibt 404 zurück", async () => {
    const response = await request(app).get("/api/gibt-es-nicht");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Endpoint nicht gefunden",
    });
  });
});
