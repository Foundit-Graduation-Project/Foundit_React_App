import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth';

const PublicRoute = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    // If already logged in, redirect to home feed
    return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicRoute;