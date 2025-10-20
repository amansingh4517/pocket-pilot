import {Router} from 'express';
import {register , login , getMe} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const authRouter = Router();

// Public routes
authRouter.post('/register', register);
authRouter.post('/login', login);

// Protected route (requires authentication)
authRouter.get('/me',protect, getMe);

export default authRouter;