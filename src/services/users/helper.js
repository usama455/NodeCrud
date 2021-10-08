import bcrypt from "bcrypt";
import User from "./model";
import { resStatuses } from "../../constants/response";

const checkUserExists = async ({ body }, res, next) => {
	const { email } = body;
	const user = await User.findOne({ email });
	if (user) {
		return res.status(resStatuses.badRequest).json({ success: false, message: "User already exists" });
	}
	return next();
};

export { checkUserExists };
