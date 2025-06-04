import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <ShoppingBag className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-300 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products" className="btn-accent">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left px-6 py-3">Product</th>
                    <th className="text-center px-6 py-3">Quantity</th>
                    <th className="text-right px-6 py-3">Price</th>
                    <th className="text-right px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {items.map(item => (
                    <motion.tr 
                      key={item.product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <Link 
                              to={`/products/${item.product.id}`}
                              className="font-medium text-gray-100 hover:text-primary-100 transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <div className="text-gray-400 text-sm mt-1">
                              {item.product.licenseType === 'subscription' 
                                ? `${item.product.licenseDuration} subscription` 
                                : 'Perpetual license'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-300 hover:bg-gray-700 rounded-l-md border border-gray-600"
                          >
                            -
                          </button>
                          <input 
                            type="number" 
                            min="1" 
                            value={item.quantity} 
                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                            className="w-12 h-8 text-center bg-gray-700 border-y border-gray-600 text-gray-100"
                          />
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-300 hover:bg-gray-700 rounded-r-md border border-gray-600"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div>
                          {item.product.discountPrice ? (
                            <div>
                              <span className="font-bold text-primary-100">
                                ${(item.product.discountPrice * item.quantity).toFixed(2)}
                              </span>
                              <div className="text-sm text-gray-400 line-through">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ) : (
                            <span className="font-bold text-primary-100">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => removeItem(item.product.id)}
                          className="text-gray-400 hover:text-error-300 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between mt-4">
              <button 
                onClick={clearCart}
                className="text-gray-300 hover:text-error-300 transition-colors text-sm flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear Cart
              </button>
              <Link to="/products" className="text-primary-100 hover:text-primary-200 transition-colors text-sm flex items-center">
                Continue Shopping
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
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
              
              <Link to="/checkout" className="btn-accent w-full flex items-center justify-center mb-4">
                Proceed to Checkout
              </Link>
              
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
                  <p className="ml-3 text-gray-300 text-sm">24/7 customer support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;