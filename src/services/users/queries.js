import User from "../../models/users";

const create = (user) => {
	const newUser = new User(user);
	return newUser.save();
	// return User.insert(User);
};

const update = (user) => {
	const newUser = new User(user);
	return newUser.updateOne({}, {});
};

const getAll = () => {
	return User.find();
};

const findOne = (email) => {
	return User.findOne({ email: email });
};

export default { create, findOne, getAll };
