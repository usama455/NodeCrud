import Router from "express";
import books from "./books";
const router = new Router();

router.use("/books", books);

module.exports = router;
