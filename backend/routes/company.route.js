import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import isRecruiter from '../middlewares/isRecruiter.js';
import { getCompany, getCompanyById, updateCompany ,registerCompany} from '../controllers/company.controller.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

// Recruiter-only routes
router.route("/register").post(isAuthenticated, isRecruiter, registerCompany);
router.route("/get").get(isAuthenticated, isRecruiter, getCompany);
router.route("/update/:id").put(isAuthenticated, isRecruiter, singleUpload, updateCompany);

// Both roles can access (students can view company details)
router.route("/get/:id").get(isAuthenticated, getCompanyById);

export default router;