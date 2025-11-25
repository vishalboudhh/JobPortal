import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import isRecruiter from '../middlewares/isRecruiter.js';
import isStudent from '../middlewares/isStudent.js';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';

const router = express.Router();

// Student-only routes
router.route("/apply/:id").get(isAuthenticated, isStudent, applyJob);
router.route("/get").get(isAuthenticated, isStudent, getAppliedJobs);

// Recruiter-only routes
router.route("/:id/applicants").get(isAuthenticated, isRecruiter, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, isRecruiter, updateStatus);

export default router;
