import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="container-custom text-center">
        <div className="max-w-2xl mx-auto">
          <Shield className="h-20 w-20 text-primary-100 mx-auto mb-6 opacity-50" />
          
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
          
          <p className="text-gray-300 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/" className="btn-accent flex items-center justify-center">
              <Home className="h-5 w-5 mr-2" />
              Return Home
            </Link>
            <Link to="/products" className="btn-outline flex items-center justify-center">
              <Search className="h-5 w-5 mr-2" />
              Browse Products
            </Link>
          </div>
          
          <div className="cyber-separator"></div>
          
          <h3 className="text-xl font-semibold mb-4 mt-8">Looking for something specific?</h3>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search our site..."
                className="input pr-12 w-full"
              />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-100 hover:text-primary-200"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;