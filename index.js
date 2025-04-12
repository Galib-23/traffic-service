import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { addVisitor, visitorStats } from "./controllers/visitor.controller.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is connected!");
  })
  .catch((error) => {
    console.log("Error in mongo connection: ", error);
  });


//ROUTES______________
app.post("/api/visitor", addVisitor);
app.get("/api/visitor-stats", visitorStats);


app.get("/", (req, res) => {
  res.send("Traffic Server running...");
});

app.listen(PORT, () => {
  console.log(`Traffic Server running on port ${PORT}`);
});
