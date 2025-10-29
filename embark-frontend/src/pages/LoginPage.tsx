import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { IconMail, IconLogin, IconShield } from "@tabler/icons-react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email);
      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Login failed. Please check your email."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 rounded-full mb-4 shadow-2xl">
            <IconShield size={48} className="text-white" stroke={2.5} />
          </div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
            Welcome to Embark
          </h1>
          <p className="text-gray-300 text-lg">Begin your epic journey today</p>
        </div>

        {/* Login Card */}
        <div
          className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-purple-500/40 rounded-2xl shadow-2xl p-8 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconMail size={20} className="text-gray-400" stroke={2} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <IconLogin size={20} stroke={2.5} />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div
          className="text-center mt-6 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="text-gray-400 text-sm">
            Simple email login - no password required
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
