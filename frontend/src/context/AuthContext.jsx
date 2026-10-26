import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  name: 'Alex Mercer',
  email: 'alex.mercer@concept.dev',
  role: 'Product Lead',
  phone: '+1 (555) 389-2041',
  dob: '1994-06-18',
  company: 'THE SOCIETY',
  bio: 'Product Lead & Design Systems Architect crafting high-density SaaS interfaces and modular software pipelines.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
  interests: ['Design', 'Development', 'Business'],
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('the_platform_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('the_platform_user', JSON.stringify(user));
    } catch {
      // Ignore storage errors in sandbox
    }
  }, [user]);

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return { user: DEFAULT_USER, updateUser: () => {} };
  }
  return context;
}
