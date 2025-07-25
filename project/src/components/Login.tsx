import React, { useState } from 'react';
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sample users for demonstration
  const users = [
    {
      id: 'U001',
      username: 'john.doe',
      password: 'police123',
      name: 'Inspector John Doe',
      role: 'police_officer',
      agency: 'GPS',
      phone: '+233244000001',
      badgeNumber: 'GPS-001'
    },
    {
      id: 'U002',
      username: 'sarah.mensah',
      password: 'dvla123',
      name: 'Sarah Mensah',
      role: 'dvla_officer',
      agency: 'DVLA',
      phone: '+233244000002',
      staffId: 'DVLA-045'
    },
    {
      id: 'U003',
      username: 'michael.asante',
      password: 'nrsa123',
      name: 'Michael Asante',
      role: 'nrsa_analyst',
      agency: 'NRSA',
      phone: '+233244000003',
      staffId: 'NRSA-012'
    },
    {
      id: 'U004',
      username: 'public',
      password: 'public123',
      name: 'Public User',
      role: 'public',
      agency: 'Public',
      phone: '+233244000004'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = users.find(u => 
      u.username === credentials.username && u.password === credentials.password
    );

    if (user) {
      onLogin(user);
    } else {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (role: string) => {
    const user = users.find(u => u.role === role);
    if (user) {
      setCredentials({ username: user.username, password: user.password });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">ITVMS</h1>
          <p className="text-blue-100">Integrated Traffic Violation Management System</p>
          <p className="text-blue-200 text-sm mt-2">Republic of Ghana</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Secure Login
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 text-center">Demo Accounts:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDemoLogin('police_officer')}
                className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded hover:bg-blue-100 transition-colors"
              >
                Police Officer
              </button>
              <button
                onClick={() => handleDemoLogin('dvla_officer')}
                className="text-xs bg-green-50 text-green-700 px-3 py-2 rounded hover:bg-green-100 transition-colors"
              >
                DVLA Officer
              </button>
              <button
                onClick={() => handleDemoLogin('nrsa_analyst')}
                className="text-xs bg-purple-50 text-purple-700 px-3 py-2 rounded hover:bg-purple-100 transition-colors"
              >
                NRSA Analyst
              </button>
              <button
                onClick={() => handleDemoLogin('public')}
                className="text-xs bg-gray-50 text-gray-700 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                Public Portal
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Security Notice:</strong> This system is for authorized personnel only. 
              All activities are logged and monitored in compliance with Ghana's Data Protection Act (2012).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-blue-200 text-sm">
          <p>© 2025 Government of Ghana. All rights reserved.</p>
          <p className="mt-1">Powered by Ghana Police Service, DVLA & NRSA</p>
        </div>
      </div>
    </div>
  );
};

export default Login;