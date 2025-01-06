import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, MessageSquareCode, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/AuthSlice/AuthSlice.js";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");  // Renamed from fullName
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill up all fields");
      return;
    }

    const formData = { Name: name, Email: email, Password: password };  // Updated keys
    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      if (result.success) {
        alert("Account created successfully!");
        navigate('/login');
      }
    } catch (err) {
      alert(err?.message || "Failed to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden lg:grid lg:grid-cols-2">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br
         from-blue-500 to-purple-500 text-white p-8">
          <div className="text-center space-y-4">
            <div
              className="p-4 bg-white rounded-full shadow-lg flex items-center justify-center 
              text-blue-500 transition-transform transform hover:scale-110"
            >
              <MessageSquareCode className="size-6" />
            </div>
            <h2 className="text-3xl font-bold">Welcome Back!</h2>
            <p className="text-white/80">
              Join us and explore endless possibilities with your free account.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-8 lg:p-12 flex flex-col justify-center items-center">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
              <p className="text-gray-600">
                Get started with your free account today!
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Name
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="size-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10 bg-gray-50 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Email
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10 bg-gray-50 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="size-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10 bg-gray-50 focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-gray-400" />
                    ) : (
                      <Eye className="size-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {isLoading ? (
                <button
                  type="button"
                  className="btn btn-primary w-full bg-blue-500 cursor-not-allowed"
                  disabled
                >
                  ...
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600
                   hover:to-purple-600 focus:ring-2 focus:ring-blue-500"
                >
                  Create Account
                </button>
              )}
            </form>

            {error && (
              <div className="text-red-500 text-center mt-2">{error}</div>
            )}

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="link link-primary text-blue-500 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
