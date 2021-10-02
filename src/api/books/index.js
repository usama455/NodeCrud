import Router from "express";
import { getAllBooks } from "./controller";

const router = new Router();

router.get("/all-books", getAllBooks);

export default router;
