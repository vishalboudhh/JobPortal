import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

/**
 * AdminRoute - Requires user to be authenticated AND have recruiter role
 * Redirects to home if not authorized
 */
const AdminRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);

    if (!user) {
        toast.error('Please login to access this page');
        return <Navigate to="/login" replace />;
    }

    if (user.role !== 'recruiter') {
        toast.error('Access denied. Recruiter role required.');
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;

