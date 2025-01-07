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

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        await dispatch(checkAuth()).unwrap();
      } catch (err) {
        console.log('Auth check failed:', err);
      }
    };
    checkUserAuth();
  }, [dispatch]);


  const PublicRoute = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/formPage" replace />;
    }
    return children;
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login"  />;
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