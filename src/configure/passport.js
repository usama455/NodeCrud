import { model } from "mongoose";
import { passport } from "passport";
import LocalStrategy from "passport-local";
import User from "../services/users/model";
import jwt from "jsonwebtoken";
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

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
