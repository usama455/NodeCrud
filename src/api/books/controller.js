import { success } from "../../utils/response";
export const getAllBooks = async (req, res) => {
	return success(res, {
		books: ["abc", "abcd"]
	});
};
