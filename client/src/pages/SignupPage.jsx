import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup({ name, email, password });
      navigate('/', { replace: true });
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
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Looks like you're new here!</h2>
            <p className="text-gray-600">
              Sign up to get started and enjoy personalized shopping
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
                type="text"
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-primary font-medium">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

