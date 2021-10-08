import Router from "express";
import { addBook, getAll } from "./controller";

const router = new Router();

router.post("/add", addBook);
router.get("/getAll", getAll);
export default router;
