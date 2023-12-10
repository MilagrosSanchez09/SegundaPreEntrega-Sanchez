// user.router.js
import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { validateLogIn } from "../middlewares/loginValidator.js";

const controller = new UserController();
const router = Router();

router.get("/register", (req, res) => {
    res.render('register');
})

router.post("/register", controller.register);
router.post("/post", controller.login);
router.post("/login", controller.login);

router.get("/info", validateLogIn, controller.infoSession);
router.get("/secret-endpoint", validateLogIn, controller.visit);
router.post("/logout", controller.logout);

export default router;