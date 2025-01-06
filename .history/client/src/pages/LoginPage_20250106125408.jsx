import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, User, MessageSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/AuthSlice/AuthSlice.js";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = loginUser;
    try {
      const resultAction = await dispatch(action(formData));
      if (resultAction.type.endsWith('/fulfilled')) {
        navigate('/dashboard'); // Redirect on success
      }
    } catch (err) {
      console.error('Authentication failed:', err);
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-blue-100 p-8 shadow-lg rounded-lg">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">
                {isRegistering ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="text-base-content/60">
                {isRegistering ? "Sign up for an account" : "Sign in to your account"}
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegistering && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Name</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full flex justify-center bg-blue-400 text-black
               items-center py-3 rounded-lg font-semibold shadow-md transition-all duration-300 
               hover:bg-primary-focus hover:scale-105 active:scale-95 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="link link-primary text-blue-600"
              >
                {isRegistering ? "Sign in" : "Create account"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white">
        <div className="text-center max-w-md p-8">
          <h2 className="text-4xl font-bold mb-4">
            {isRegistering ? "Join Our Community!" : "Welcome Back!"}
          </h2>
          <p className="text-lg">
            {isRegistering
              ? "Create an account to get started with our amazing features and join our growing community."
              : "Sign in to access your dashboard, manage your preferences, and stay connected with our community."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;