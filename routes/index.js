// routes/index.js
import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';  // Files Controller

const router = Router();

// Existing routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);

// File routes
router.post('/files', FilesController.postUpload);  // Upload files
router.get('/files/:id', FilesController.getShow);  // Get file by ID
router.get('/files', FilesController.getIndex);     // List files
router.put('/files/:id/publish', FilesController.putPublish);  // Publish file
router.put('/files/:id/unpublish', FilesController.putUnpublish);  // Unpublish file
router.get('/files/:id/data', FilesController.getFile);  // Get file data

export default router;
