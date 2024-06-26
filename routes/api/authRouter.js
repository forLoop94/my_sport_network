import { Router } from "express";
import { login, registerUser } from "../../controllers/auth/authController.js";
import { verifyUser } from "../../controllers/auth/verificationController.js";
import { forgotPassword, resetPassword } from "../../controllers/auth/passwordResetController.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/verify/:userId/:uniqueString', verifyUser);
router.get('/forgotpassword/:userId', forgotPassword);
router.post('/resetpassword', resetPassword);

export default router
