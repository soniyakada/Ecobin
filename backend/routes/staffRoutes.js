import express from 'express';
const router = express.Router();

import { createStaff, getAllStaff } from '../controllers/staffController.js';

// @route   POST /api/staff
// @desc    Create new staff member
router.post('/createstaff', createStaff);

// @route   GET /api/staff
// @desc    Get all staff
router.get('/allstaff', getAllStaff);

export default router;
