import { created } from "../../utils/response";
import queries from "./queries";

const registerUser = async (req, res) => {
	console.log(req.body);
	const { name, email, password } = req.body;
	await queries.create({ name, email, password });

	return created(res, {
		user: name,
		email: email,
		password: password
	});
};

export { registerUser };
