import { Router } from "express";
import { getAllUsers } from "../../controllers/userController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";

const router = Router();

router.get('/', authenticateToken, getAllUsers);

export default router;