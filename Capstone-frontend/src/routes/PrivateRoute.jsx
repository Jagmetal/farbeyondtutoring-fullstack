import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useLocation } from 'react-router-dom';

const PrivateRoute = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await Auth.currentAuthenticatedUser();
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) return null;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location.pathname }} />;

};

export default PrivateRoute;
