import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  resetPassword,
  checkAuth,
  saveCart,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
//paila middleware ko method run hunxa ani tespaxi middleware ma bhako next ley arko ma ja bhanxa ani logout run hunxa

router.route("/refresh-token").post(refreshAccessToken);

router.route("/reset-password").post(resetPassword);

router.post("/cart/save", verifyJWT, saveCart);

router.route("/check-auth").get(verifyJWT, checkAuth);

export default router;
