import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, Package, CreditCard, LogOut, ShieldCheck, Settings, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AccountPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: '/account' } }} />;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-gray-800 rounded-lg overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                    <User className="h-8 w-8 text-gray-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-100">{user?.name}</h2>
                    <p className="text-gray-400">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <Link to="/account" className="flex items-center px-4 py-3 rounded-md bg-gray-700 text-gray-100">
                      <User className="h-5 w-5 mr-3" />
                      <span>Account Overview</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/account/orders" className="flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-gray-100 transition-colors">
                      <Package className="h-5 w-5 mr-3" />
                      <span>My Orders</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/account/licenses" className="flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-gray-100 transition-colors">
                      <ShieldCheck className="h-5 w-5 mr-3" />
                      <span>My Licenses</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/account/billing" className="flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-gray-100 transition-colors">
                      <CreditCard className="h-5 w-5 mr-3" />
                      <span>Billing & Payments</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/account/settings" className="flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-gray-100 transition-colors">
                      <Settings className="h-5 w-5 mr-3" />
                      <span>Account Settings</span>
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={logout}
                      className="flex items-center w-full text-left px-4 py-3 rounded-md text-gray-300 hover:bg-error-900/30 hover:text-error-300 transition-colors"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-8">Account Overview</h1>
            
            {/* Account Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center mb-4">
                  <ShieldCheck className="h-8 w-8 text-primary-100 mr-3" />
                  <h3 className="text-xl font-semibold">Active Licenses</h3>
                </div>
                <p className="text-3xl font-bold text-primary-100">3</p>
                <Link to="/account/licenses" className="text-sm text-primary-100 hover:text-primary-200 inline-flex items-center mt-4">
                  View Licenses <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center mb-4">
                  <Package className="h-8 w-8 text-primary-100 mr-3" />
                  <h3 className="text-xl font-semibold">Recent Orders</h3>
                </div>
                <p className="text-3xl font-bold text-primary-100">2</p>
                <Link to="/account/orders" className="text-sm text-primary-100 hover:text-primary-200 inline-flex items-center mt-4">
                  View Orders <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center mb-4">
                  <Bell className="h-8 w-8 text-primary-100 mr-3" />
                  <h3 className="text-xl font-semibold">Notifications</h3>
                </div>
                <p className="text-3xl font-bold text-primary-100">5</p>
                <Link to="/account/notifications" className="text-sm text-primary-100 hover:text-primary-200 inline-flex items-center mt-4">
                  View All <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Recent Orders */}
            <div className="bg-gray-800 rounded-lg mb-8">
              <div className="border-b border-gray-700 p-6">
                <h2 className="text-xl font-semibold">Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="text-left px-6 py-3">Order ID</th>
                      <th className="text-left px-6 py-3">Date</th>
                      <th className="text-left px-6 py-3">Products</th>
                      <th className="text-right px-6 py-3">Total</th>
                      <th className="text-right px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 text-primary-100">#CYB-123456</td>
                      <td className="px-6 py-4">May 15, 2024</td>
                      <td className="px-6 py-4">CyberShield Pro</td>
                      <td className="px-6 py-4 text-right">$59.99</td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-2 py-1 bg-success-100/20 text-success-100 text-xs rounded-full">
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-primary-100">#CYB-123457</td>
                      <td className="px-6 py-4">May 10, 2024</td>
                      <td className="px-6 py-4">PrivacyGuard VPN</td>
                      <td className="px-6 py-4 text-right">$59.99</td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-2 py-1 bg-success-100/20 text-success-100 text-xs rounded-full">
                          Completed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-700 text-center">
                <Link to="/account/orders" className="text-primary-100 hover:text-primary-200">
                  View All Orders
                </Link>
              </div>
            </div>
            
            {/* Active Licenses */}
            <div className="bg-gray-800 rounded-lg">
              <div className="border-b border-gray-700 p-6">
                <h2 className="text-xl font-semibold">Active Licenses</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="border border-gray-700 rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-700 flex justify-between items-center">
                    <h3 className="font-semibold">CyberShield Pro</h3>
                    <span className="px-2 py-1 bg-primary-100/20 text-primary-100 text-xs rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-gray-400 text-sm">License Key:</span>
                        <p className="font-mono bg-gray-700 p-2 rounded mt-1 text-sm overflow-x-auto">
                          XXXX-XXXX-XXXX-XXXX
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Valid Until:</span>
                        <p className="text-gray-100 mt-1">May 15, 2025</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Devices:</span>
                        <p className="text-gray-100 mt-1">2 of 3</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Type:</span>
                        <p className="text-gray-100 mt-1">1 Year Subscription</p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="btn-outline py-1 px-3 text-sm">Download</button>
                      <button className="btn-outline py-1 px-3 text-sm">Manage Devices</button>
                      <button className="btn-outline py-1 px-3 text-sm">Renew</button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-700 rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-700 flex justify-between items-center">
                    <h3 className="font-semibold">PrivacyGuard VPN</h3>
                    <span className="px-2 py-1 bg-primary-100/20 text-primary-100 text-xs rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-gray-400 text-sm">License Key:</span>
                        <p className="font-mono bg-gray-700 p-2 rounded mt-1 text-sm overflow-x-auto">
                          XXXX-XXXX-XXXX-XXXX
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Valid Until:</span>
                        <p className="text-gray-100 mt-1">May 10, 2025</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Devices:</span>
                        <p className="text-gray-100 mt-1">3 of 5</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Type:</span>
                        <p className="text-gray-100 mt-1">1 Year Subscription</p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="btn-outline py-1 px-3 text-sm">Download</button>
                      <button className="btn-outline py-1 px-3 text-sm">Manage Devices</button>
                      <button className="btn-outline py-1 px-3 text-sm">Renew</button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-700 rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-700 flex justify-between items-center">
                    <h3 className="font-semibold">DataVault Encryption</h3>
                    <span className="px-2 py-1 bg-primary-100/20 text-primary-100 text-xs rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-gray-400 text-sm">License Key:</span>
                        <p className="font-mono bg-gray-700 p-2 rounded mt-1 text-sm overflow-x-auto">
                          XXXX-XXXX-XXXX-XXXX
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Valid Until:</span>
                        <p className="text-gray-100 mt-1">Perpetual</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Devices:</span>
                        <p className="text-gray-100 mt-1">1 of 2</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Type:</span>
                        <p className="text-gray-100 mt-1">Perpetual License</p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="btn-outline py-1 px-3 text-sm">Download</button>
                      <button className="btn-outline py-1 px-3 text-sm">Manage Devices</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-700 text-center">
                <Link to="/account/licenses" className="text-primary-100 hover:text-primary-200">
                  View All Licenses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ArrowRight(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default AccountPage;