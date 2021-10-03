import User from "../../models/users";

const create = (user) => {
	const newUser = new User(user);
	return newUser.save();
	// return User.insert(User);
};

export default { create };
