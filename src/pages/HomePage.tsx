import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, CheckCircle, AlertTriangle, TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

const HomePage: React.FC = () => {
  const featuredProducts = products.filter(product => product.isFeatured);
  const newReleases = products.filter(product => product.isNewRelease);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <Spline scene="https://prod.spline.design/d1402bbe-ad0b-4a72-80ee-c5e4bb0a39b3/scene.splinecode" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Next-Gen <span className="security-gradient">Cybersecurity</span> Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Protect your digital life with enterprise-grade security tools designed for everyone. 
              Stay one step ahead of cyber threats with our advanced protection suite.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/products" className="btn-accent text-center">
                Browse Products
              </Link>
              <Link to="/products?category=courses" className="btn-outline text-center">
                Explore Courses
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-success-100 mr-2" />
                <span className="text-gray-200">30-Day Money Back</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-success-100 mr-2" />
                <span className="text-gray-200">24/7 Support</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-success-100 mr-2" />
                <span className="text-gray-200">Regular Updates</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowRight className="h-6 w-6 text-primary-100 rotate-90" />
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-800">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">
              Featured <span className="security-gradient">Products</span>
            </h2>
            <Link to="/products" className="flex items-center text-primary-100 hover:text-primary-200 transition-colors">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-900">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">
              Why Choose <span className="security-gradient">CyberShield</span>
            </h2>
            <p className="text-gray-300">
              We combine advanced technology with user-friendly design to create cybersecurity solutions that protect without complexity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div 
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="rounded-full bg-primary-900/40 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-100" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">Advanced Protection</h3>
              <p className="text-gray-300">
                Our AI-driven threat detection identifies and neutralizes advanced attacks before they can harm your system.
              </p>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="rounded-full bg-success-900/40 w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-success-100" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">Performance Optimized</h3>
              <p className="text-gray-300">
                Enjoy comprehensive security without system slowdowns, thanks to our lightweight, optimized code.
              </p>
            </motion.div>
            
            {/* Card 3 */}
            <motion.div 
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="rounded-full bg-warning-900/40 w-12 h-12 flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-warning-200" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">Real-time Alerts</h3>
              <p className="text-gray-300">
                Get instant notifications about security threats, allowing you to take immediate action when needed.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Releases Section */}
      <section className="py-20 bg-gray-800">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">
              New <span className="security-gradient">Releases</span>
            </h2>
            <Link to="/products?filter=new" className="flex items-center text-primary-100 hover:text-primary-200 transition-colors">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newReleases.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">
              Trusted by <span className="security-gradient">Professionals</span>
            </h2>
            <p className="text-gray-300">
              See what security experts and customers have to say about our products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div 
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                  <span className="text-lg font-semibold text-gray-100">JD</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-100">John Doe</h4>
                  <p className="text-gray-400 text-sm">CTO, TechSolutions Inc.</p>
                </div>
              </div>
              <p className="text-gray-300">
                "CyberShield Pro is now standard across our entire organization. The threat detection is unparalleled, and the management console makes administration effortless."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-warning-200 fill-warning-200" />
                ))}
              </div>
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div 
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                  <span className="text-lg font-semibold text-gray-100">AS</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-100">Alice Smith</h4>
                  <p className="text-gray-400 text-sm">Security Researcher</p>
                </div>
              </div>
              <p className="text-gray-300">
                "As someone who tests security products for a living, I can confidently say that PrivacyGuard VPN is the most secure and reliable VPN service I've used."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-warning-200 fill-warning-200" />
                ))}
              </div>
            </motion.div>
            
            {/* Testimonial 3 */}
            <motion.div 
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                  <span className="text-lg font-semibold text-gray-100">RJ</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-100">Robert Johnson</h4>
                  <p className="text-gray-400 text-sm">Home User</p>
                </div>
              </div>
              <p className="text-gray-300">
                "After my computer was infected with ransomware last year, I switched to CyberShield. It's been running silently in the background, keeping everything safe without any slowdowns."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-warning-200 fill-warning-200" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-pattern bg-cover bg-center opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to <span className="security-gradient">Secure</span> Your Digital Life?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust CyberShield for their cybersecurity needs. Get started today with our 30-day money-back guarantee.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/products" className="btn-accent text-center">
                  Shop Now
                </Link>
                <Link to="#" className="btn-outline text-center">
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog/Security News Section */}
      <section className="py-20 bg-gray-900">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">
              Latest <span className="security-gradient">Security News</span>
            </h2>
            <Link to="#" className="flex items-center text-primary-100 hover:text-primary-200 transition-colors">
              Visit Blog <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <motion.article 
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img 
                src="https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Ransomware attacks" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs text-gray-400">May 15, 2024</span>
                  <span className="mx-2 text-gray-600">•</span>
                  <span className="text-xs text-primary-100">Threats</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-100">
                  Ransomware Attacks Surge: How to Protect Your Business
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  Recent data shows a 300% increase in ransomware attacks targeting small businesses. Learn the essential steps to safeguard your organization.
                </p>
                <Link to="#" className="flex items-center text-primary-100 hover:text-primary-200 transition-colors">
                  Read More <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </motion.article>
            
            {/* Blog Post 2 */}
            <motion.article 
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img 
                src="https://images.pexels.com/photos/374103/pexels-photo-374103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Zero-day vulnerabilities" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs text-gray-400">May 10, 2024</span>
                  <span className="mx-2 text-gray-600">•</span>
                  <span className="text-xs text-primary-100">Vulnerabilities</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-100">
                  Critical Zero-Day Vulnerability Discovered in Popular Browser
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  Security researchers have identified a severe vulnerability affecting millions of users. Here's what you need to know and how to stay protected.
                </p>
                <Link to="#" className="flex items-center text-primary-100 hover:text-primary-200 transition-colors">
                  Read More <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </motion.article>
            
            {/* Blog Post 3 */}
            <motion.article 
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img 
                src="https://images.pexels.com/photos/5380649/pexels-photo-5380649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="AI in cybersecurity" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs text-gray-400">May 5, 2024</span>
                  <span className="mx-2 text-gray-600">•</span>
                  <span className="text-xs text-primary-100">Technology</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-100">
                  The Role of AI in Next-Generation Cybersecurity Solutions
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  Artificial intelligence is revolutionizing how we detect and respond to cyber threats. Explore the latest innovations in AI-powered security.
                </p>
                <Link to="#" className="flex items-center text-primary-100 hover:text-primary-200 transition-colors">
                  Read More <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </motion.article>
          </div>
        </div>
      </section>
    </div>
  );
};

function Star(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default HomePage;