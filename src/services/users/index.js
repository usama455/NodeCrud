import Router from "express";
import { register, getAll, login } from "./controller";
import { checkUserExists } from "./helper";
import passport from "passport";

const router = new Router();

router.post("/register", checkUserExists, register);
//the client will send the JWT token in Authorization Header as a Bearer Token.
router.get("/getAll", passport.authenticate("jwt", { session: false }), getAll);
router.post("/login", login);
export default router;
