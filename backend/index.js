import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import Users from "./models/UserModel.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
  await Users.sync();
} catch (error) {
  console.log(error);
}

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log("Server running at port 5000"));
