import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentStep, setPaymentStep] = useState<'details' | 'processing' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    country: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('confirmation');
    }, 2000);
  };
  
  const handleReturnToStore = () => {
    clearCart();
    navigate('/');
  };
  
  if (items.length === 0 && paymentStep !== 'confirmation') {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {paymentStep === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Your Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-300 mb-1">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="input w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-gray-300 mb-1">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="input w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-gray-300 mb-1">Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="input w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-gray-300 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                        className="input w-full"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <CreditCard className="h-6 w-6 text-primary-100 mr-2" />
                      <span className="text-gray-300">Credit / Debit Card</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="bg-gray-700 rounded px-2 py-1 text-xs text-gray-300">VISA</div>
                      <div className="bg-gray-700 rounded px-2 py-1 text-xs text-gray-300">MASTERCARD</div>
                      <div className="bg-gray-700 rounded px-2 py-1 text-xs text-gray-300">AMEX</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="cardName" className="block text-gray-300 mb-1">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                      className="input w-full"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-gray-300 mb-1">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="input w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-gray-300 mb-1">Expiration Date</label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        required
                        className="input w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="cardCvc" className="block text-gray-300 mb-1">CVC</label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        placeholder="123"
                        required
                        className="input w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="h-4 w-4 rounded border-gray-600 text-primary-100 focus:ring-primary-100 mt-1"
                    />
                    <label htmlFor="terms" className="ml-2 text-gray-300 text-sm">
                      I agree to the <a href="#" className="text-primary-100 hover:text-primary-200">Terms of Service</a> and <a href="#" className="text-primary-100 hover:text-primary-200">Privacy Policy</a>
                    </label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button type="submit" className="btn-accent w-full flex items-center justify-center">
                    Complete Purchase
                  </button>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="max-h-60 overflow-y-auto mb-4">
                  {items.map(item => (
                    <div key={item.product.id} className="flex items-start py-3 border-b border-gray-700 last:border-b-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-12 h-12 object-cover rounded mr-3"
                      />
                      <div className="flex-1">
                        <h3 className="text-gray-100 font-medium">{item.product.name}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-gray-400 text-sm">Qty: {item.quantity}</span>
                          <span className="text-primary-100 font-medium">
                            ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>${(getCartTotal() * 0.0).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 my-2 pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary-100">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="bg-gray-700/50 p-4 rounded-lg space-y-3">
                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-success-100 mt-0.5" />
                    <p className="ml-3 text-gray-300 text-sm">Secure checkout with 256-bit encryption</p>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-success-100 mt-0.5" />
                    <p className="ml-3 text-gray-300 text-sm">30-day money-back guarantee</p>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-success-100 mt-0.5" />
                    <p className="ml-3 text-gray-300 text-sm">Instant digital delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {paymentStep === 'processing' && (
          <div className="bg-gray-800 rounded-lg p-12 max-w-xl mx-auto text-center">
            <div className="animate-pulse mb-6">
              <div className="h-24 w-24 mx-auto rounded-full bg-primary-900 flex items-center justify-center">
                <CreditCard className="h-12 w-12 text-primary-100" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Processing Your Payment</h2>
            <p className="text-gray-300 mb-6">
              Please wait while we secure your transaction. This will only take a moment.
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
              <div className="bg-gradient-to-r from-primary-100 to-success-100 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
            <p className="text-gray-400 text-sm">Please do not refresh or close this page.</p>
          </div>
        )}
        
        {paymentStep === 'confirmation' && (
          <div className="bg-gray-800 rounded-lg p-12 max-w-2xl mx-auto text-center">
            <div className="mb-6 relative">
              <div className="h-24 w-24 mx-auto rounded-full bg-success-900/40 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-success-100" />
              </div>
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div className="animate-ping absolute h-24 w-24 rounded-full bg-success-100/20"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
            <p className="text-gray-300 mb-6">
              Thank you for your purchase. Your order has been confirmed and your products are now ready for download.
            </p>
            
            <div className="bg-gray-700/50 p-6 rounded-lg mb-8 text-left">
              <h3 className="text-lg font-medium mb-4">Order Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-400">Order Number:</div>
                <div className="text-gray-100">CYB-{Math.floor(100000 + Math.random() * 900000)}</div>
                <div className="text-gray-400">Date:</div>
                <div className="text-gray-100">{new Date().toLocaleDateString()}</div>
                <div className="text-gray-400">Payment Method:</div>
                <div className="text-gray-100">Credit Card (****{formData.cardNumber.slice(-4)})</div>
                <div className="text-gray-400">Total Amount:</div>
                <div className="text-gray-100">${getCartTotal().toFixed(2)}</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleReturnToStore} className="btn-accent">
                Return to Store
              </button>
              <button className="btn-outline">
                View My Products
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;