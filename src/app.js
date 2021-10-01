// // const express = require("express");
import express from "express";
const app = express();

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}... `));