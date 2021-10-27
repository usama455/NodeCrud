import { model } from "mongoose";
import { passport } from "passport";
import { error } from "../utils/response";
import LocalStrategy from "passport-local";
import User from "../services/users/model";
import jwt from "jsonwebtoken";
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
// const Users = model("Users");

const initializePassport = async (passport) => {
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
const checkIsInRole =
	(...roles) =>
	(req, res, next) => {
		if (!req.user) {
			// RETURN NO USER HERE
			return error(res, "User not Found");
			// return next(null, false, { message: "Unable to find user" });
		}
		const hasRole = roles.find((role) => {
			return req.user.role === role;
		});
		if (!hasRole) {
			return error(res, "User not Authorized");
			// return next(null, false, { message: "Unable to find user role" });
		}

		return next();
	};

export { checkIsInRole, initializePassport };
