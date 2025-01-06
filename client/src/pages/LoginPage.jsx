import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, MessageSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/AuthSlice/AuthSlice.js";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {  error } = useSelector((state) => state.auth);
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
        navigate("/formPage");
      }
    } catch (err) {
      console.log('Authentication failed:', err);
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-gradient-to-br from-blue-50 to-blue-500">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-lg border border-gray-200">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center shadow-lg">
                <h1 className="text-center text-blue-900"> Login</h1>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="form-control mb-4">
              <label className="label text-sm font-semibold text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="Email"
                  className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-control mb-6">
              <label className="label text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full flex justify-center items-center py-3 rounded-lg 
              font-semibold shadow-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none active:scale-95 disabled:opacity-70"
            >
              Login
            </button>
          </form>

          {/* Sign up link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-semibold">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white px-8 py-12">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg">
            Sign in to access your dashboard, manage your preferences, and stay connected with our community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
