import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * ProtectedRoute - Requires user to be authenticated
 * Redirects to login if not authenticated
 */
const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

