import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="bg-white shadow-md rounded-sm flex max-w-3xl w-full overflow-hidden">
        <div className="hidden md:flex flex-col justify-center bg-white p-12 w-2/5 border-r border-gray-100">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
            <p className="text-gray-600">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          {/* <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Shopping"
            className="rounded-lg shadow-sm object-cover h-64 w-full"
          /> */}
        </div>

        <div className="flex-1 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-xs text-red-500">{error}</div>}
            <p className="text-xs text-gray-500">
              By continuing, you agree to our <span className="text-primary">Terms of Use</span> and{' '}
              <span className="text-primary">Privacy Policy</span>.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-white py-2 text-sm font-medium rounded-sm bg-orange-500 disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">New to our store? </span>
            <Link to="/signup" className="text-primary font-medium">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

