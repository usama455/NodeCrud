import { created, success } from "../../utils/response";
import Book from "./model";
import { logger } from "./../../utils/";

export const addBook = async (req, res) => {
	try {
		const newBook = new Book({ ...req.body });
		await newBook.save();
		return created(res, {});
	} catch (err) {
		console.log("ERR", err.message);
		logger.error(err.message);
		return error(res, err.message);
	}
};
export const getAll = async (req, res) => {
	try {
		const booksData = await Book.find();
		return success(res, {
			data: booksData
		});
	} catch (err) {
		logger.error(err.message);
		return error(res, err.message);
	}
};
