require("@babel/register");
const path = require("path");
if (process.env.NODE_ENV !== "production") {
	const dotenv = require("dotenv");
	dotenv.config({
		path: path.join(__dirname, "../.env"),
		example: path.join(__dirname, "../.env.example")
	});
}
exports = module.exports = require("./app");
