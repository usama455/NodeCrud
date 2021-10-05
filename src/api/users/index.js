import Router from "express";
import { register,getAll } from "./controller";
import { checkUserExists, encryptPassword } from "./helper";
const router = new Router();

router.post("/register",checkUserExists, encryptPassword ,register);
router.get("/getAll", getAll)

export default router;
