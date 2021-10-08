import Router from "express";
import { register, getAll, login } from "./controller";
import { checkUserExists } from "./helper";
const router = new Router();

router.post("/register", checkUserExists, register);
router.get("/getAll", getAll);
router.post("/login", login);
export default router;
