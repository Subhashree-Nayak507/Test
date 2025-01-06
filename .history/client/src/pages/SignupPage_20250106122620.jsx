import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, MessageSquare, Mail, Lock, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/AuthSlice/AuthSlice";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(registerUser(formData)).unwrap();
      if (response.success) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration failed:", err);
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
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Sign up to get started</p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
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
                  name="Name"
                  className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Enter your name"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
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
                  placeholder="Enter your email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
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
                  onChange={handleChange}
                  required
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
               items-center py-3 rounded-lg font-semibold shadow-md transition-all duration-300 hover:bg-primary-focus
                hover:scale-105 active:scale-95"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary text-blue-600">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white">
        <div className="text-center max-w-md p-8">
          <h2 className="text-4xl font-bold mb-4">Join Our Community!</h2>
          <p className="text-lg">
            Create an account to access exclusive features, personalize your
            experience, and connect with our growing community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;