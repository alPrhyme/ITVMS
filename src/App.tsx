import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ViolationsList from './components/ViolationsList';
import PublicPortal from './components/PublicPortal';
import Analytics from './components/Analytics';
import { BarChart3, List, Home, Users } from 'lucide-react';
import sampleData from './data/sampleData.json';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentRole, setCurrentRole] = useState('police_officer');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    setIsAuthenticated(true);
    
    // Set appropriate default tab based on role
    if (user.role === 'public') {
      setActiveTab('portal');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentRole('police_officer');
    setActiveTab('dashboard');
  };

  const handleRoleChange = (role: string) => {
    // In a real system, this would check if the user has permission for this role
    setCurrentRole(role);
    
    // Update current user name based on role for demo purposes
    const userMap = {
      police_officer: 'Inspector John Doe',
      dvla_officer: 'Sarah Mensah', 
      nrsa_analyst: 'Michael Asante',
      public: 'Public User'
    };
    
    setCurrentUser({
      ...currentUser,
      name: userMap[role as keyof typeof userMap] || currentUser.name,
      role: role
    });
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  useEffect(() => {
    // Reset to appropriate default tab when role changes
    if (currentRole === 'public') {
      setActiveTab('portal');
    } else if (!tabs.find(tab => tab.id === activeTab)) {
      setActiveTab('dashboard');
    }
  }, [currentRole]);

  const getTabsForRole = (role: string) => {
    const commonTabs = [
      { id: 'dashboard', name: 'Dashboard', icon: Home }
    ];

    switch (role) {
      case 'police_officer':
      case 'dvla_officer':
      case 'nrsa_analyst':
        return [
          ...commonTabs,
          { id: 'violations', name: 'Violations', icon: List },
          { id: 'analytics', name: 'Analytics', icon: BarChart3 }
        ];
      case 'public':
        return [
          { id: 'portal', name: 'Check Violations', icon: Users }
        ];
      default:
        return commonTabs;
    }
  };

  const tabs = getTabsForRole(currentRole);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard data={sampleData} />;
      case 'violations':
        return <ViolationsList violations={sampleData.violations} userRole={currentRole} />;
      case 'analytics':
        return <Analytics data={sampleData} />;
      case 'portal':
        return <PublicPortal violations={sampleData.violations} />;
      default:
        return <Dashboard data={sampleData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser.name}
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        onLogout={handleLogout}
      />
      
      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Role-specific info */}
          <div className="p-4 border-t border-gray-200 mt-8">
            <div className="text-xs text-gray-600 mb-2">Quick Access</div>
            <div className="space-y-2 text-sm">
              {currentRole === 'public' ? (
                <>
                  <div className="text-gray-700">• Check violations</div>
                  <div className="text-gray-700">• Pay fines online</div>
                  <div className="text-gray-700">• View history</div>
                </>
              ) : (
                <>
                  <div className="text-gray-700">• Real-time monitoring</div>
                  <div className="text-gray-700">• Data analytics</div>
                  <div className="text-gray-700">• Report generation</div>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;