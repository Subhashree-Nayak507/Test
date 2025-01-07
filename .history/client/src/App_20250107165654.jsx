import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import FormPage from './pages/FormPage';
import SignUpPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { checkAuth } from './store/AuthSlice/AuthSlice.js';

const App = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }
// Add this temporarily to your frontend to check cookie content
useEffect(() => {
  console.log('All cookies:', document.cookie);
}, []);
  const PublicRoute = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/formPage" replace />;
    }
    return children;
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      // Store the attempted URL to redirect back after login
      return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/formPage"
        element={
          <ProtectedRoute>
            <FormPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;