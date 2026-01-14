import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'fk_clone_auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const saveAuth = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
    if (nextUser && nextToken) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser, token: nextToken }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const login = async (email, password) => {
    try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            // If response is not JSON (e.g. HTML 404/500), throw meaningful error
             const text = await res.text();
             console.error("Non-JSON response from server:", text);
             throw new Error("Server returned non-JSON response. Is the backend running?");
        }

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Login failed');
        }
        saveAuth(data.user, data.token);
        return data.user;
    } catch (error) {
         console.error("Login error:", error);
         throw error;
    }
  };

  const signup = async ({ name, email, password }) => {
    try {
        const res = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
             const text = await res.text();
             console.error("Non-JSON response from server:", text);
             throw new Error("Server returned non-JSON response. Is the backend running?");
        }

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Signup failed');
        }
        saveAuth(data.user, data.token);
        return data.user;
    } catch (error) {
        console.error("Signup error:", error);
        throw error;
    }
  };

  const logout = () => {
    saveAuth(null, null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user && !!token,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

