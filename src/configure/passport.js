import { model } from "mongoose";
import { passport } from "passport";
import LocalStrategy from "passport-local";
import User from "../services/users/model";
import jwt from "jsonwebtoken";

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
// const Users = model("Users");

export const initializePassport = async (passport) => {
	const authenticateUser = async (email, password, done) => {
		const user = await User.findOne({ email });
		if (user === null) return done(null, false, { message: "User does not exist" });
		try {
			if (!(await user.validatePassword(password))) {
				return done(null, false, { message: "Wrong Password" });
			}
			const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY);
			return done(null, token);
		} catch (err) {
			return done(err);
		}
	};
	passport.use(
		new LocalStrategy(
			{
				usernameField: "email"
			},
			authenticateUser
		)
	);

	passport.use(
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
				secretOrKey: process.env.SECRET_KEY
			},
			async (jwtPayload, done) => {
				//find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
				const user = await User.findById(jwtPayload._id);
				console.log(user);
				if (!user) return done(null, false);
				return done(null, user);
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
