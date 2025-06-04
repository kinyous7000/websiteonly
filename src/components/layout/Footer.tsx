import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, CreditCard, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 pt-16 pb-8">
      <div className="container-custom">
        {/* Payment & Security Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-gray-700 pb-8">
          <div className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-md">
            <Lock className="h-5 w-5 text-success-100" />
            <span className="text-sm text-gray-200">256-bit Encryption</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-md">
            <CreditCard className="h-5 w-5 text-primary-100" />
            <span className="text-sm text-gray-200">Secure Payments</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-md">
            <Shield className="h-5 w-5 text-success-100" />
            <span className="text-sm text-gray-200">Money-Back Guarantee</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="h-6 w-6 text-primary-100" />
              <span className="text-xl font-bold security-gradient">CyberShield</span>
            </div>
            <p className="text-gray-300 mb-4">
              Protecting your digital life with premium cybersecurity solutions since 2010. Our mission is to make advanced security accessible to everyone.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-primary-100 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-100 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-100 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-100 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="text-gray-100 font-semibold text-lg mb-6">Products</h3>
            <ul className="space-y-3">
              <li><Link to="/products?category=security-suite" className="text-gray-300 hover:text-primary-100 transition-colors">Security Suites</Link></li>
              <li><Link to="/products?category=antivirus" className="text-gray-300 hover:text-primary-100 transition-colors">Antivirus Software</Link></li>
              <li><Link to="/products?category=vpn" className="text-gray-300 hover:text-primary-100 transition-colors">VPN Services</Link></li>
              <li><Link to="/products?category=password-manager" className="text-gray-300 hover:text-primary-100 transition-colors">Password Managers</Link></li>
              <li><Link to="/products?category=encryption" className="text-gray-300 hover:text-primary-100 transition-colors">Encryption Tools</Link></li>
              <li><Link to="/products?category=firewall" className="text-gray-300 hover:text-primary-100 transition-colors">Firewalls</Link></li>
              <li><Link to="/products?category=courses" className="text-gray-300 hover:text-primary-100 transition-colors">Security Courses</Link></li>
            </ul>
          </div>

          {/* Column 3: Help & Support */}
          <div>
            <h3 className="text-gray-100 font-semibold text-lg mb-6">Help & Support</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-300 hover:text-primary-100 transition-colors">FAQs</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-primary-100 transition-colors">Knowledge Base</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-primary-100 transition-colors">Customer Support</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-primary-100 transition-colors">System Status</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-primary-100 transition-colors">Downloads</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-primary-100 transition-colors">Documentation</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-primary-100 transition-colors">Community Forum</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-gray-100 font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary-100 mt-0.5" />
                <span className="text-gray-300">support@cybershield.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary-100 mt-0.5" />
                <span className="text-gray-300">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-100 mt-0.5" />
                <span className="text-gray-300">
                  CyberShield Inc.<br />
                  123 Security Blvd.<br />
                  San Francisco, CA 94105
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-8 pb-8">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-gray-100 font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">Subscribe to our newsletter for the latest security news, product updates, and special offers.</p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="input bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:ring-2 focus:ring-primary-100 sm:w-72"
              />
              <button type="submit" className="btn-accent whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CyberShield Inc. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-400">
            <Link to="#" className="hover:text-primary-100 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary-100 transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-primary-100 transition-colors">Refund Policy</Link>
            <Link to="#" className="hover:text-primary-100 transition-colors">Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;