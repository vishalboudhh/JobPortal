import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Please fill the missing fields",
                success: false
            });
        };

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        })

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })

    } catch (error) {
        console.log(`Error in register controller`, error)
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill the missing fields",
                success: false
            });
        };

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            })
        }

        //check role is correct or not
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role !",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }


        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })

    } catch (error) {
        console.log(`Error in Login controller`, error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successfully",
            success: true
        })
    } catch (error) {
        console.log(`Error in logout`, error);
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills, resumeLink, resumeName } = req.body;
        const file = req.file; // Profile photo file

        let cloudResponse = null;
        
        // Handle profile photo upload to Cloudinary with fallback
        if (file) {
            try {
                console.log('Starting profile photo upload to Cloudinary...');
                const fileUri = getDataUri(file);
                
                // Simple upload without complex transformations
                cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: "image",
                    folder: "job-portal-profile-photos",
                    public_id: `profile_${Date.now()}`,
                    access_mode: "public",
                    quality: "auto:low",
                    fetch_format: "auto"
                });
                
                console.log('Profile photo uploaded successfully to Cloudinary');
            } catch (uploadError) {
                console.log('Cloudinary upload error, using fallback:', uploadError);
                
                // Fallback: Store as base64 data URL (temporary solution)
                const fileUri = getDataUri(file);
                cloudResponse = {
                    secure_url: fileUri.content
                };
                
                console.log('Using base64 fallback for profile photo');
            }
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id; //middleware Authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found !",
                success: false
            })
        }

        // Initialize profile object if it doesn't exist
        if (!user.profile) {
            user.profile = {};
        }

        //updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        // Handle Google Drive resume link
        if(resumeLink){
            user.profile.resume = resumeLink
            user.profile.resumeOriginalName = resumeName || "Resume.pdf"
        }

        // Handle profile photo upload
        if(cloudResponse){
            user.profile.profilePhoto = cloudResponse.secure_url
        }
        
        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true
        })

    } catch (error) {
        console.log(`Error in updateProfile`, error);
        return res.status(500).json({
            message: error.message || "Internal server error",
            success: false
        })
    }
};