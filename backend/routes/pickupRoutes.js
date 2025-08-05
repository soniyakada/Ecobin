import express from 'express';
import {
  createPickupRequest,
  assignStaff,
  getAllPickupRequests,
  getUserPickupRequests,
  deletePickupRequest,
  markPickupCompleted
} from '../controllers/pickupController.js';
import authenticate from '../middlewares/authenticate.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// User: Create pickup request
router.post('/create', authenticate, authorizeRoles('user'),  upload.single('image'), createPickupRequest);

// User: Get own pickup requests
router.get('/my-requests',authenticate , getUserPickupRequests);

// Admin: Get all pickup requests
router.get('/all',authenticate ,authorizeRoles('admin'),getAllPickupRequests);

// Admin: Assign staff to pickup request
router.put('/assign/:requestId',authenticate, authorizeRoles('admin'),assignStaff);
router.delete('/pickup/:id', deletePickupRequest);
router.put("/pickups/:id/complete", markPickupCompleted);



export default router;
