import Router from "express";
import { register, getAll, validatePassword } from "./controller";
// import { checkUserExists } from "./helper";
const router = new Router();

router.post("/register", register);
router.get("/getAll", getAll);
router.post("/validatePassowrd", validatePassword);
export default router;
