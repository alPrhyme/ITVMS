import React from 'react';
import { Shield, Users, AlertTriangle, Settings, LogOut } from 'lucide-react';

interface HeaderProps {
  currentUser: string;
  currentRole: string;
  onRoleChange: (role: string) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, currentRole, onRoleChange, onLogout }) => {
  const roles = [
    { id: 'police_officer', name: 'Police Officer', icon: Shield },
    { id: 'dvla_officer', name: 'DVLA Officer', icon: Users },
    { id: 'nrsa_analyst', name: 'NRSA Analyst', icon: AlertTriangle },
    { id: 'public', name: 'Public Portal', icon: Users }
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">ITVMS</h1>
                <p className="text-xs text-gray-600">Integrated Traffic Violation Management System</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Switch Role:</span>
              <select
                value={currentRole}
                onChange={(e) => onRoleChange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {currentUser.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{currentUser}</p>
                <p className="text-gray-600 text-xs capitalize">{currentRole.replace('_', ' ')}</p>
              </div>
            </div>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            
            <button 
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;