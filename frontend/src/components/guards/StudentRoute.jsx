import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

/**
 * StudentRoute - Requires user to be authenticated AND have student role
 * Redirects to home if not authorized
 */
const StudentRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);

    if (!user) {
        toast.error('Please login to access this page');
        return <Navigate to="/login" replace />;
    }

    if (user.role !== 'student') {
        toast.error('Access denied. Student role required.');
        return <Navigate to="/" replace />;
    }

    return children;
};

export default StudentRoute;

