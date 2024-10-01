// routes/index.js

import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const router = Router();

// Define the routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);
router.get('/users/me', UsersController.getMe); // New route

// Authentication routes
router.get('/connect', AuthController.getConnect); // New route
router.get('/disconnect', AuthController.getDisconnect); // New route

export default router;
