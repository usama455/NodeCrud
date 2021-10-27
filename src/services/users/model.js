import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { jwt } from "jsonwebtoken";
const SALT_WORK_FACTOR = 10;
import { ROLES } from "../../utils";
// require('./config/passport');

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: [true, "Email is required. "],
			unique: [true, "Email already exists."]
		},
		password: {
			type: String,
			required: true
		},
		role: {
			type: String,
			enum: Object.keys(ROLES),
			required: true
		}
	},
	{
		timestamps: true
	}
);

UserSchema.pre("save", async function (next) {
	const user = this;

	if (!user.isModified("password")) return next();
	const hash = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
	user.password = hash;
	next();
});

UserSchema.methods.validatePassword = async function (password) {
	const isMatch = await bcrypt.compare(password, this.password);
	return isMatch;
};

UserSchema.methods.generateJWT = function () {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 60);

	return jwt.sign(
		{
			email: this.email,
			id: this._id,
			exp: parseInt(expirationDate.getTime() / 1000, 10)
		},
		"secret"
	);
};

const User = model("User", UserSchema);

export default User;
