// routes/index.js
import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';  // New import

const router = Router();

// Existing routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);

// New routes for file management
router.post('/files', FilesController.postUpload);  // File upload
router.get('/files/:id', FilesController.getShow);  // Get file by ID
router.get('/files', FilesController.getIndex);     // List files

export default router;
