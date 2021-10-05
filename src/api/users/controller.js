import { created, success } from "../../utils/response";
import { resStatuses,messages } from "../../constants/response";
import queries from "./queries";

const register = async (req, res) => {
	const { name, email, password } = req.body;
	await queries.create({ name, email, password });

	return created(res,{
		"status":resStatuses.ok,
		"message":messages.created
	});
};

const getAll = async (req,res) =>{
	const userData = await queries.getAll()
	return success(res,{
		"status":resStatuses.ok,
		"message":messages.retrieved,
		"data":userData
	});
}



export { register, getAll };
