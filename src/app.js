import express, { json } from "express";
import mongo from "./configure/mongoose";

const app = express();
app.use(json());
mongo.connect();

app.use("/", require("./api/index"));
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}... `));
