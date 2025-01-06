import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, MessageSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/AuthSlice/AuthSlice.js";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser(formData)).unwrap();
      if (response.success) {
        alert("Login successfully");
        navigate("/dashboard"); // redirect to the dashboard or appropriate page
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
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
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
                  name="Email"
                  className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Enter your Email"
                  value={formData.Email}
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
                  name="Password"
                  className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="••••••••"
                  value={formData.Password}
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
              Don't have an account?{" "}
              <Link to="/register" className="link link-primary text-blue-600">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white">
        <div className="text-center max-w-md p-8">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg">
            Sign in to access your dashboard, manage your preferences, and stay connected with our community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
