import React, { useState } from 'react';
import { Search, CreditCard, FileText, Phone, Mail, MapPin, Calendar } from 'lucide-react';

interface PublicPortalProps {
  violations: any[];
}

const PublicPortal: React.FC<PublicPortalProps> = ({ violations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedViolation, setSelectedViolation] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const results = violations.filter(violation => 
      violation.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      violation.offenderPhone.includes(searchQuery)
    );
    setSearchResults(results);
  };

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

  const getViolationTypeDisplay = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <CreditCard className="h-5 w-5 text-green-500 mr-2" />
            Pay Fine - {selectedViolation?.id}
          </h3>
          <button
            onClick={() => setShowPayment(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Fine Amount:</span>
              <span className="text-2xl font-bold text-blue-600">₵{selectedViolation?.fine}</span>
            </div>
            <div className="text-sm text-gray-600">
              Violation: {getViolationTypeDisplay(selectedViolation?.type || '')}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Mobile Money (MTN/Vodafone)</option>
                <option>Bank Transfer</option>
                <option>Credit/Debit Card</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+233 XX XXX XXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button 
                onClick={() => {
                  // Simulate payment processing
                  alert('Payment processed successfully! You will receive a confirmation SMS.');
                  setShowPayment(false);
                  setSelectedViolation(null);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Pay Now
              </button>
              <button 
                onClick={() => setShowPayment(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Check Your Traffic Violations</h2>
        <p className="text-blue-100 mb-6">
          Search for traffic violations using your vehicle number or phone number. 
          Pay fines securely online and view your violation history.
        </p>
        
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter vehicle number (e.g., GR-1234-25) or phone number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Found {searchResults.length} violation(s)
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {searchResults.map((violation) => (
              <div key={violation.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-lg font-semibold text-gray-900">{violation.vehicleNumber}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(violation.severity)}`}>
                        {violation.severity.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(violation.status)}`}>
                        {violation.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        {getViolationTypeDisplay(violation.type)}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {violation.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(violation.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600 mb-2">₵{violation.fine}</div>
                    <div className="space-x-2">
                      <button
                        onClick={() => setSelectedViolation(violation)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        View Details
                      </button>
                      {violation.status !== 'paid' && (
                        <button
                          onClick={() => {
                            setSelectedViolation(violation);
                            setShowPayment(true);
                          }}
                          className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Phone className="h-8 w-8 text-blue-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Contact Support</h3>
          </div>
          <p className="text-gray-600 mb-4">Need help with your violation or payment?</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-gray-400 mr-2" />
              <span>+233 302 773 906</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-gray-400 mr-2" />
              <span>support@itvms.gov.gh</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="h-8 w-8 text-green-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
          </div>
          <p className="text-gray-600 mb-4">Secure payment options available:</p>
          <ul className="text-sm space-y-1">
            <li>• Mobile Money (MTN, Vodafone)</li>
            <li>• Bank Transfer</li>
            <li>• Credit/Debit Cards</li>
            <li>• Cash at Service Centers</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FileText className="h-8 w-8 text-purple-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Dispute Process</h3>
          </div>
          <p className="text-gray-600 mb-4">Think there's an error? File a dispute:</p>
          <button className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
            File Dispute
          </button>
        </div>
      </div>

      {/* Violation Detail Modal */}
      {selectedViolation && !showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Violation Details - {selectedViolation.id}
              </h3>
              <button
                onClick={() => setSelectedViolation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="text-center pb-4 border-b border-gray-200">
                <div className="text-3xl font-bold text-red-600 mb-2">₵{selectedViolation.fine}</div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedViolation.status)}`}>
                  {selectedViolation.status.toUpperCase()}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Violation Type:</span>
                  <span className="font-medium">{getViolationTypeDisplay(selectedViolation.type)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="font-medium">{selectedViolation.vehicleNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{selectedViolation.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium">{new Date(selectedViolation.timestamp).toLocaleDateString()}</span>
                </div>
                {selectedViolation.speed && (
                  <div className="flex justify-between bg-orange-50 p-3 rounded-lg">
                    <span className="text-gray-600">Speed Recorded:</span>
                    <span className="font-semibold text-orange-600">
                      {selectedViolation.speed} km/h (Limit: {selectedViolation.speedLimit} km/h)
                    </span>
                  </div>
                )}
              </div>
              
              {selectedViolation.status !== 'paid' && (
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowPayment(true)}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pay Fine
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showPayment && <PaymentModal />}
    </div>
  );
};

export default PublicPortal;