// Role-based authorization middleware - Student only
const isStudent = (req, res, next) => {
    try {
        // isAuthenticated middleware must be called first to set req.user
        if (!req.user) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        if (req.user.role !== 'student') {
            return res.status(403).json({
                message: "Access denied. Student role required.",
                success: false,
            });
        }

        next();
    } catch (error) {
        console.log(`Error in isStudent middleware`, error);
        return res.status(500).json({
            message: "Authorization failed",
            success: false,
        });
    }
};

export default isStudent;

