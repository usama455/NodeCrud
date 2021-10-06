import { created, success, error, updated, wrongPassword, validPassword } from "../../utils/response";
import User from "../../models/users";
import { logger } from "./../../utils/";
import mongoose from "mongoose";

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

const validatePassword = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		const isValidated = await user.validatePassword(password);
		if (isValidated) return validPassword(res, {});
		else return wrongPassword(res, {});
		return updated(res, {});
	} catch (err) {
		console.log(err);
		logger.error(err.message);
		return error(res, err.message);
	}
};
const getAll = async (req, res) => {
	try {
		const userData = await User.find();
		return success(res, {
			data: userData
		});
	} catch (err) {
		logger.error(err.message);
		return error(res, err.message);
	}
};

export { register, getAll, validatePassword };
