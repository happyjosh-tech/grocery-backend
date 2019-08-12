const request = require("supertest");

const app = require("../app");
const Meal = require("../models/Meal");

/**
 * Schema Reference
 *
 * const mealSchema = new Schema({
 *   name: String,
 *   description: String,
 *   groceries: [{ type: Schema.Types.ObjectId, ref: "grocery" }]
 * });
 *
 */

describe("GET /api/meals", () => {
  test("Should return a list of meals", async () => {
    /** create some meals to return */
    const meals = [
      {
        name: "My first meal",
        description: "My first meal setup"
      },
      {
        name: "My second meal",
        description: "My second meal setup"
      }
    ];

    const data = meals.map(meal => new Meal(meal));

    await Promise.all(data.map(meal => meal.save()));
    const response = await request(app).get("/api/meals");

    /**
     * check that we got the right response type
     */
    expect(response.status).toBe(200);

    /**
     * check that we are getting back json.
     */
    expect(response.header).toEqual(
      expect.objectContaining({
        "content-type": "application/json; charset=utf-8"
      })
    );

    /**
     * Check that we are getting back an array
     */
    expect(response.body).toBeInstanceOf(Array);
    /**
     * there should be two items returned
     */
    expect(response.body).toHaveLength(2);

    /**
     * expect to get data back in the right format
     */
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          name: "My first meal",
          description: "My first meal setup",
          groceries: expect.any(Array)
        }),
        expect.objectContaining({
          _id: expect.any(String),
          description: "My second meal setup",
          name: "My second meal",
          groceries: expect.any(Array)
        })
      ])
    );
  });
});

describe("POST /api/meals", () => {
  test("I should be able to create a meal", async () => {
    const response = await request(app)
      .post("/api/meals")
      .send({
        name: "My first meal",
        description: "Some Description"
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        groceries: expect.any(Array),
        name: "My first meal",
        description: "Some Description"
      })
    );
  });
});

describe("PUT /api/meals/:id", () => {
  test("a user should be able to edit a meal", async () => {
    const meal = new Meal({
      name: "My Meal",
      description: "my nondescript description"
    });

    await meal.save();

    const response = await request(app)
      .put(`/api/meals/${meal.id}`)
      .send({ ...meal, name: "My new name" });

    expect(response.status).toBe(200);
  });
});

describe("DELETE /api/meals/:id", () => {
  test("a user should be able to delete a meal", async () => {
    const meal = new Meal({
      name: "meal I will delete",
      description: ""
    });

    await meal.save();

    const response = await request(app).delete(`/api/meals/${meal.id}`);

    expect(response.status).toBe(200);
  });
});
