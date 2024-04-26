import { Router } from "express";
import { login, registerUser } from "../../controllers/auth/authController.js";
import { verifyUser } from "../../controllers/auth/verificationController.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/verify/:userId/:uniqueString', verifyUser);

export default router
