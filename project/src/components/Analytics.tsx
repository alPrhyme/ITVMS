import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, MapPin, Clock, Calendar } from 'lucide-react';

interface AnalyticsProps {
  data: any;
}

const Analytics: React.FC<AnalyticsProps> = ({ data }) => {
  const violations = data.violations;
  const cameras = data.cameras;

  // Calculate analytics
  const violationsByType = violations.reduce((acc: any, violation: any) => {
    acc[violation.type] = (acc[violation.type] || 0) + 1;
    return acc;
  }, {});

  const violationsBySeverity = violations.reduce((acc: any, violation: any) => {
    acc[violation.severity] = (acc[violation.severity] || 0) + 1;
    return acc;
  }, {});

  const violationsByHour = violations.reduce((acc: any, violation: any) => {
    const hour = new Date(violation.timestamp).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  const violationsByLocation = violations.reduce((acc: any, violation: any) => {
    acc[violation.location] = (acc[violation.location] || 0) + 1;
    return acc;
  }, {});

  const totalFines = violations.reduce((sum: number, violation: any) => sum + violation.fine, 0);
  const paidFines = violations.filter((v: any) => v.status === 'paid').reduce((sum: number, violation: any) => sum + violation.fine, 0);
  const collectionRate = ((paidFines / totalFines) * 100).toFixed(1);

  const getViolationTypeDisplay = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Violations</p>
              <p className="text-3xl font-bold text-gray-900">{violations.length}</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">+12% this week</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Collection Rate</p>
              <p className="text-3xl font-bold text-gray-900">{collectionRate}%</p>
            </div>
            <TrendingUp className="h-12 w-12 text-green-500" />
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">₵{paidFines.toLocaleString()} collected</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Cameras</p>
              <p className="text-3xl font-bold text-gray-900">{cameras.filter((c: any) => c.status === 'active').length}</p>
            </div>
            <MapPin className="h-12 w-12 text-blue-500" />
          </div>
          <div className="mt-4">
            <span className="text-gray-600 text-sm">of {cameras.length} total cameras</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-3xl font-bold text-gray-900">12.5min</p>
            </div>
            <Clock className="h-12 w-12 text-purple-500" />
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">-15% improvement</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Violations by Type */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 text-blue-500 mr-2" />
            Violations by Type
          </h3>
          <div className="space-y-3">
            {Object.entries(violationsByType).map(([type, count]: [string, any]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-gray-600">{getViolationTypeDisplay(type)}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(count / violations.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Violations by Severity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            Violations by Severity
          </h3>
          <div className="space-y-3">
            {Object.entries(violationsBySeverity).map(([severity, count]: [string, any]) => {
              const colors = {
                critical: 'bg-red-600',
                high: 'bg-orange-500',
                moderate: 'bg-yellow-500'
              };
              return (
                <div key={severity} className="flex items-center justify-between">
                  <span className="text-gray-600 capitalize">{severity}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${colors[severity as keyof typeof colors]} h-2 rounded-full`}
                        style={{ width: `${(count / violations.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-8">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Locations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="h-5 w-5 text-green-500 mr-2" />
          High-Risk Locations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(violationsByLocation)
            .sort(([,a], [,b]) => (b as number) - (a as number))
            .slice(0, 6)
            .map(([location, count]: [string, any]) => (
              <div key={location} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm">{location}</h4>
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {count} violations
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  Requires increased monitoring
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Time Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="h-5 w-5 text-purple-500 mr-2" />
          Violations by Hour of Day
        </h3>
        <div className="grid grid-cols-12 gap-2">
          {Array.from({ length: 24 }, (_, hour) => {
            const count = violationsByHour[hour] || 0;
            const maxCount = Math.max(...Object.values(violationsByHour));
            const height = maxCount > 0 ? Math.max((count / maxCount) * 100, 5) : 5;
            
            return (
              <div key={hour} className="flex flex-col items-center">
                <div 
                  className="bg-blue-500 rounded-t w-full transition-all hover:bg-blue-600"
                  style={{ height: `${height}px` }}
                  title={`${hour}:00 - ${count} violations`}
                ></div>
                <span className="text-xs text-gray-600 mt-1">{hour}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Peak hours: 8-10 AM and 5-7 PM (Rush hours)
        </div>
      </div>

      {/* Predictive Insights */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2" />
          AI-Powered Insights & Predictions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-purple-700 bg-opacity-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">High-Risk Prediction</h4>
            <p className="text-purple-100 text-sm">
              Accra-Tema Motorway expected to have 23% more violations this weekend based on weather and traffic patterns.
            </p>
          </div>
          <div className="bg-purple-700 bg-opacity-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Optimal Deployment</h4>
            <p className="text-purple-100 text-sm">
              Deploy 3 additional units to East Legon Junction between 7-9 AM for maximum violation prevention.
            </p>
          </div>
          <div className="bg-purple-700 bg-opacity-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Revenue Forecast</h4>
            <p className="text-purple-100 text-sm">
              Projected monthly collection: ₵45,000 based on current trends and seasonal patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;