import {protect} from '../middleware/auth.middleware.js';
import {
    getSummary,
    getByCategory,
    getRecent,
    getSatisfactionAnalysis
} from '../controllers/userDashboard.controller.js';
import {Router} from 'express';

const userDashboardRouter = Router();

// All dashboard routes are protected
userDashboardRouter.use(protect);

userDashboardRouter.get('/summary', getSummary);
userDashboardRouter.get('/by-category', getByCategory);
userDashboardRouter.get('/recent', getRecent);
userDashboardRouter.get('/satisfaction', getSatisfactionAnalysis);

export default userDashboardRouter;