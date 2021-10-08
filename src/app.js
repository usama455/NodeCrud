import express, { json, urlencoded } from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import mongo from "./configure/mongoose";
import { initializePassport } from "./configure/passport";

const app = express();

initializePassport(passport);

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(
	session({
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true }
	})
);

app.use(passport.initialize());
app.use(passport.session());

mongo.connect();

app.use("/", require("./services/index"));
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}... `));
