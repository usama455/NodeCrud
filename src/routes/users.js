const express = require("express");
const router = express.Router();
import { logger } from "./../utils";

router.get("/", (req, res) => {
	logger.error("Test info log");
	res.send("hello user");
});

module.exports = router;
