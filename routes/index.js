// routes/index.js
import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const router = Router();

// Existing routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);  // Creating new users

// New routes for authentication
router.get('/connect', AuthController.getConnect);  // Authenticate user
router.get('/disconnect', AuthController.getDisconnect);  // Log out user
router.get('/users/me', UsersController.getMe);  // Get authenticated user's info

export default router;
