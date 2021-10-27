import { created, success, error, updated, wrongPassword, validPassword } from "../../utils/response";
import User from "./model";
import { logger } from "./../../utils/";
import passport from "passport";

const register = async (req, res) => {
	try {
		const newUser = new User({ ...req.body });
		await newUser.save();
		return created(res, {});
	} catch (err) {
		console.log("ERR", err.message);
		logger.error(err.message);
		return error(res, err.message);
	}
};

const login = async (req, res, next) => {
	try {
		await passport.authenticate("local", (err, token, info) => {
			if (err) {
				return next(err);
			}
			if (!token) {
				return error(res, info);
			}
			return success(res, { message: info, token: token });
		})(req, res, next);
	} catch (err) {
		console.log(err);
		logger.error(err.message);
		return error(res, err.message);
	}
};
const getAll = async (req, res) => {
	try {
		console.log(req);
		const userData = await User.find();
		return success(res, {
			data: userData
		});
	} catch (err) {
		logger.error(err.message);
		return error(res, err.message);
	}
};

export { register, getAll, login };
