import supertest from "supertest";
import app from "./index";
import db from "./config/Database.js";

const request = supertest;

let jwtTokenUser1;
let jwtTokenUser3;

beforeAll(async () => {
  try {
    // Ensure the database connection is established
    await db.authenticate();
    console.log("Database connection has been established successfully.");

    // Rest of your test setup code
    const loginResponseUser1 = await request(app)
      .post("/login")
      .send({
        email: "email1@gmail.com",
        password: "123456789",
      })
      .expect(200);

    // ...
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the process if database connection fails
  }
});

describe("API Endpoint Tests", () => {
  it("should get users with valid token", async () => {
    const loginResponseUser1 = await request(app)
      .post("/login")
      .send({
        email: "email1@gmail.com",
        password: "123456789",
      })
      .expect(200);

    jwtTokenUser1 = loginResponseUser1.body.accessToken;

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${jwtTokenUser1}`)
      .expect(200);

    // Add additional assertions if needed
  });

  it("should create a new user and return a token", async () => {
    await request(app)
      .post("/users")
      .send({
        name: "M.Fikri1",
        email: "email1@gmail.com",
        password: "123456789",
        confirmPassword: "123456789",
      })
      .expect(200);
  });

  it("should create another new user and return a token", async () => {
    await request(app)
      .post("/users")
      .send({
        name: "Pandu",
        email: "pandu@gmail.com",
        password: "1234567",
        confirmPassword: "1234567",
      })
      .expect(200);
  });

  it("should login user and return a token", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "test@gmail.com",
        password: "12345678",
      })
      .expect(200);

    jwtTokenUser3 = response.body.accessToken;
  });

  it("should refresh the token", async () => {
    const response = await request(app)
      .get("/token")
      .set("Authorization", `Bearer ${jwtTokenUser3}`)
      .expect(401); // Update the expectation to 401 if your server returns this status for expired/invalid tokens

    // Update the token after refresh if needed (consider checking the response body for a new token)
    if (response.body.accessToken) {
      jwtTokenUser3 = response.body.accessToken;
    }
  });

  it("should log out the user", async () => {
    await request(app)
      .delete("/logout")
      .set("Authorization", `Bearer ${jwtTokenUser3}`)
      .expect(204); // Assuming your logout endpoint returns 204 on success

    // Clear the token after logout
    jwtTokenUser3 = undefined;
  });
});
