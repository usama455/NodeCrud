import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 10;
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
const User = model("User", UserSchema);

export default User;
