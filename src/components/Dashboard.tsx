import React from 'react';
import { AlertTriangle, Camera, Clock, DollarSign, MapPin, TrendingUp } from 'lucide-react';

interface DashboardProps {
  data: any;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const stats = data.statistics;
  const recentViolations = data.violations.slice(0, 5);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'notified': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Today's Violations</p>
              <p className="text-3xl font-bold">{stats.totalViolationsToday}</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-blue-200" />
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-blue-200 mr-1" />
            <span className="text-blue-100 text-sm">+12% from yesterday</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Fines Collected</p>
              <p className="text-3xl font-bold">₵{stats.totalFinesCollected.toLocaleString()}</p>
            </div>
            <DollarSign className="h-12 w-12 text-green-200" />
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-200 mr-1" />
            <span className="text-green-100 text-sm">+8% from last week</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Active Cameras</p>
              <p className="text-3xl font-bold">{stats.activeCameras}</p>
            </div>
            <Camera className="h-12 w-12 text-purple-200" />
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-purple-100 text-sm">98.5% operational</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Avg Response Time</p>
              <p className="text-3xl font-bold">{stats.responseTime}min</p>
            </div>
            <Clock className="h-12 w-12 text-orange-200" />
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-orange-100 text-sm">-15% improvement</span>
          </div>
        </div>
      </div>

      {/* Recent Violations */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            Recent Violations
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentViolations.map((violation: any) => (
              <div key={violation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(violation.severity)}`}>
                    {violation.severity.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{violation.vehicleNumber}</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {violation.location}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₵{violation.fine}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(violation.status)}`}>
                    {violation.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agency Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {data.agencies.map((agency: any) => (
          <div key={agency.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">{agency.name}</h4>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Officers:</span>
                <span className="font-medium">{agency.officers}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Units:</span>
                <span className="font-medium">{agency.activeUnits}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Contact:</span>
                <span className="font-medium text-blue-600">{agency.contact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;