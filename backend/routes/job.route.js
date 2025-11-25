import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import isRecruiter from '../middlewares/isRecruiter.js';
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';

const router = express.Router();

// Recruiter-only routes
router.route("/post").post(isAuthenticated, isRecruiter, postJob);
router.route("/getadminjobs").get(isAuthenticated, isRecruiter, getAdminJobs);

// Both roles can access
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);


export default router;