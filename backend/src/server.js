import express from "express";
import { config } from "dotenv";

config();
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("static"));

app.use("/api", router);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("[database] connected successfully");
  })
  .catch((err) => console.log("[database] error: ", err));

const PORT = process.env.PORT || 4321;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`[server] started on port: ${PORT}`);
});
