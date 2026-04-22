import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth';

const ProtectedRoute = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(state => state.auth.user);
    
    // 1. If not logged in, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 2. If logged in but NOT verified, redirect to verification page
    if (user && user.isVerified === false) {
        return <Navigate to="/verify-account" replace />;
    }

    // 3. Otherwise, allow access
    return <Outlet />;
};

export default ProtectedRoute;