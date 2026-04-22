import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth';

const ProtectedRoute = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    // If not logged in, redirect to login
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;