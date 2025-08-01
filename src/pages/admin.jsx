import React, { useState, useEffect } from 'react';
import { Mail, Phone, Search, Building2, Calendar, User, ChevronLeft, ChevronRight, Lock } from 'lucide-react';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 10;

  const ADMIN_PASSWORD = "1234";

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    
    const dummyMessages = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Inc',
        phone: '+1 555-123-4567',
        message: 'Interested in your corporate wellness programs for our 100+ employees.',
        program: 'Custom Program',
        date: '2023-05-15T10:30:00Z'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        company: 'TechCorp',
        phone: '+1 555-987-6543',
        message: 'Looking for CPR certification for our team of 20.',
        program: 'CPR Certification',
        date: '2023-05-14T14:45:00Z'
      },
      {
        id: 3,
        name: 'Alex Johnson',
        email: 'alex@healthsolutions.com',
        company: 'Health Solutions Ltd',
        phone: '+1 555-456-7890',
        message: 'We need a comprehensive wellness program for our remote workforce of 150 employees.',
        program: 'Remote Wellness',
        date: '2023-05-13T09:15:00Z'
      },
      {
        id: 4,
        name: 'Sarah Williams',
        email: 'sarah@innovatetech.com',
        company: 'InnovateTech',
        phone: '+1 555-234-5678',
        message: 'Interested in stress management workshops for our development team.',
        program: 'Stress Management',
        date: '2023-05-12T16:20:00Z'
      },
      {
        id: 5,
        name: 'Michael Brown',
        email: 'michael@globalcorp.com',
        company: 'Global Corp',
        phone: '+1 555-345-6789',
        message: 'Looking to implement HIIT training sessions for our sales team.',
        program: 'HIIT Training',
        date: '2023-05-11T11:45:00Z'
      }
    ];
    setMessages(dummyMessages);
  }, [authenticated]);

  const filteredMessages = messages
    .filter(message => {
      return (
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Admin Portal
            </h2>
            <p className="text-gray-400">
              Enter the password to access the dashboard
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-6">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Messages <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              View all incoming messages from your corporate wellness contact form
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search messages..."
              className="pl-10 pr-4 py-3 w-full bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      From
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2" />
                      Company
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Program
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Message
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {currentMessages.length > 0 ? (
                  currentMessages.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                            <Mail className="h-6 w-6 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{message.name}</div>
                            <div className="text-sm text-gray-400">{message.email}</div>
                            {message.phone && (
                              <div className="text-sm text-gray-400 flex items-center mt-1">
                                <Phone className="h-3 w-3 mr-1" />
                                {message.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white font-medium">{message.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                          {message.program}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-sm text-gray-300 line-clamp-2 overflow-hidden">{message.message}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-400">{formatDate(message.date)}</div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <Mail className="h-12 w-12 text-gray-600 mb-4" />
                        <p className="text-sm text-gray-400">No messages found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredMessages.length > messagesPerPage && (
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-700 bg-gray-900">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-xl text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-xl text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-400">
                    Showing <span className="font-medium text-white">{indexOfFirstMessage + 1}</span> to{' '}
                    <span className="font-medium text-white">
                      {Math.min(indexOfLastMessage, filteredMessages.length)}
                    </span>{' '}
                    of <span className="font-medium text-white">{filteredMessages.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-xl border border-gray-600 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? 'z-10 bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500 text-white'
                            : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-xl border border-gray-600 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;