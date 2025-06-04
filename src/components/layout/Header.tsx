import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Shield, User, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../ui/SearchBar';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { getItemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  // Close menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 shadow-lg backdrop-blur-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary-100" />
            <span className="text-xl font-bold security-gradient">CyberShield</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link text-gray-100 hover:text-primary-100">Home</Link>
            <Link to="/products" className="nav-link text-gray-100 hover:text-primary-100">Products</Link>
            <Link to="/products?category=courses" className="nav-link text-gray-100 hover:text-primary-100">Courses</Link>
            <Link to="#" className="nav-link text-gray-100 hover:text-primary-100">Blog</Link>
            <Link to="#" className="nav-link text-gray-100 hover:text-primary-100">Support</Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-gray-100" />
            </button>
            
            <Link to="/cart" className="p-2 rounded-full hover:bg-gray-800 transition-colors relative">
              <ShoppingCart className="h-5 w-5 text-gray-100" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-100 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-800">
                  <User className="h-5 w-5 text-gray-100" />
                  <span className="text-sm font-medium text-gray-100">{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link to="/account" className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-700">
                    My Account
                  </Link>
                  <Link to="/account/orders" className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-700">
                    My Orders
                  </Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                  >
                    <span className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-outline py-2 px-4 text-sm">Sign In</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="p-2 rounded-full hover:bg-gray-800 transition-colors relative">
              <ShoppingCart className="h-5 w-5 text-gray-100" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-100 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-100" />
              ) : (
                <Menu className="h-6 w-6 text-gray-100" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar Overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-800 p-4 shadow-lg">
          <SearchBar onClose={() => setSearchOpen(false)} />
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 absolute top-full left-0 right-0 shadow-lg">
          <nav className="flex flex-col py-4">
            <Link to="/" className="px-6 py-3 text-gray-100 hover:bg-gray-700">Home</Link>
            <Link to="/products" className="px-6 py-3 text-gray-100 hover:bg-gray-700">Products</Link>
            <Link to="/products?category=courses" className="px-6 py-3 text-gray-100 hover:bg-gray-700">Courses</Link>
            <Link to="#" className="px-6 py-3 text-gray-100 hover:bg-gray-700">Blog</Link>
            <Link to="#" className="px-6 py-3 text-gray-100 hover:bg-gray-700">Support</Link>
            
            <div className="border-t border-gray-700 my-2"></div>
            
            <button 
              onClick={() => {
                setSearchOpen(true);
                setMobileMenuOpen(false);
              }}
              className="px-6 py-3 text-left text-gray-100 hover:bg-gray-700 flex items-center"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </button>
            
            {isAuthenticated ? (
              <>
                <Link to="/account" className="px-6 py-3 text-gray-100 hover:bg-gray-700 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  My Account
                </Link>
                <button 
                  onClick={logout}
                  className="px-6 py-3 text-left text-gray-100 hover:bg-gray-700 flex items-center"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="px-6 py-3 text-gray-100 hover:bg-gray-700">Sign In</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;