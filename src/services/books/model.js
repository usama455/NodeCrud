import { Schema, model } from "mongoose";
const BookSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		genre: {
			type: String,
			required: true
		},
		description: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

const Book = model("Book", BookSchema);

export default Book;
