import { Router } from "express";
import {
    login,
    register,
    infoUser,
    refreshToken,
    logout
} from "../controllers/auth.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { bodyRegisterValidator, bodyLoginValidator } from "../middlewares/validatorManager.js";

const router = Router();

router.post(
	"/register", 
	bodyRegisterValidator,
	register
);

router.post(
    "/login",
    bodyLoginValidator,
    login
);

// router.post("/login", login);
router.get("/protected", requireToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);

export default router;