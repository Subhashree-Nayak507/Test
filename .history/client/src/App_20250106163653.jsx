import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import FormPage from './pages/FormPage';
import SignUpPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { checkAuth } from './store/AuthSlice/AuthSlice.js';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Check authentication when app loads and on route changes
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Component for routes that require authentication
  const ProtectedRoute = ({ children }) => {
    useEffect(() => {
      // Re-check auth on protected route access
      dispatch(checkAuth());
    }, []);

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Component for routes that should not be accessible when authenticated
  const PublicRoute = ({ children }) => {
    useEffect(() => {
      // Re-check auth on public route access
      dispatch(checkAuth());
    }, []);

    if (isAuthenticated) {
      return <Navigate to="/formPage" replace />;
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
      <Route 
        path="*" 
        element={
          isAuthenticated ? 
            <Navigate to="/formPage" replace /> : 
            <Navigate to="/login" replace />
        } 
      />
    </Routes>
  );
};

export default App;