import { Router } from "express";
import { getAllUsers, getUser, updateUser } from "../../controllers/userController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";

const router = Router();

router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUser);
router.put('/:id', updateUser);

export default router;