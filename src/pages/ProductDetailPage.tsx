import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Check, Shield, ArrowLeft, Star, Info, Server, Clock, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ui/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState(products.find(p => p.id === productId));
  const [selectedTab, setSelectedTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  useEffect(() => {
    // Update product when productId changes
    setProduct(products.find(p => p.id === productId));
    // Reset tab and quantity
    setSelectedTab('description');
    setQuantity(1);
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [productId]);
  
  if (!product) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-300 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  // Find related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-primary-100">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-primary-100">Products</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-primary-100">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('-', ' ')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{product.name}</span>
        </nav>
        
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center text-gray-300 hover:text-primary-100 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
        
        {/* Product Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product Image */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Product Info */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex flex-wrap items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-100 mb-2">{product.name}</h1>
              <div className="flex items-center mb-2">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      className={`h-5 w-5 ${
                        star <= Math.round(product.rating) 
                          ? 'text-warning-200 fill-warning-200' 
                          : 'text-gray-600'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-gray-300">({product.reviewCount} reviews)</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                {product.discountPrice ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-primary-100">${product.discountPrice.toFixed(2)}</span>
                    <span className="text-xl text-gray-400 line-through ml-3">${product.price.toFixed(2)}</span>
                    <span className="ml-3 px-2 py-1 bg-success-100/20 text-success-100 text-sm font-medium rounded">
                      Save ${(product.price - product.discountPrice).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-primary-100">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              {product.licenseType === 'subscription' && (
                <div className="flex items-center text-gray-300 mb-4">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{product.licenseDuration} subscription</span>
                </div>
              )}
              
              <div className="flex items-center text-gray-300 mb-4">
                <Download className="h-4 w-4 mr-2 text-gray-400" />
                <span>{product.downloads.toLocaleString()} downloads</span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">{product.shortDescription}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Compatible With:</h3>
              <div className="flex flex-wrap gap-2">
                {product.compatibility.map(os => (
                  <span key={os} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                    {os}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-700 my-6"></div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-600 rounded-md">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-2 text-gray-300 hover:bg-gray-700"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center bg-transparent border-x border-gray-600 text-gray-100 py-2"
                />
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-2 text-gray-300 hover:bg-gray-700"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="btn-accent flex-1 flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              
              <button className="btn-outline flex items-center justify-center px-4">
                Buy Now
              </button>
            </div>
            
            <div className="flex flex-col space-y-3 bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Check className="h-5 w-5 text-success-100" />
                </div>
                <p className="ml-3 text-gray-300">Secure payment processing</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Check className="h-5 w-5 text-success-100" />
                </div>
                <p className="ml-3 text-gray-300">Instant digital delivery</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Check className="h-5 w-5 text-success-100" />
                </div>
                <p className="ml-3 text-gray-300">30-day money-back guarantee</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Check className="h-5 w-5 text-success-100" />
                </div>
                <p className="ml-3 text-gray-300">24/7 technical support</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="flex border-b border-gray-700 mb-6">
            <button 
              onClick={() => setSelectedTab('description')}
              className={`px-6 py-3 font-medium ${
                selectedTab === 'description' 
                  ? 'text-primary-100 border-b-2 border-primary-100' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Description
            </button>
            <button 
              onClick={() => setSelectedTab('specs')}
              className={`px-6 py-3 font-medium ${
                selectedTab === 'specs' 
                  ? 'text-primary-100 border-b-2 border-primary-100' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Technical Specs
            </button>
            <button 
              onClick={() => setSelectedTab('reviews')}
              className={`px-6 py-3 font-medium ${
                selectedTab === 'reviews' 
                  ? 'text-primary-100 border-b-2 border-primary-100' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            {selectedTab === 'description' && (
              <div>
                <p className="text-gray-300 mb-6">{product.description}</p>
                
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Check className="h-5 w-5 text-success-100" />
                      </div>
                      <span className="ml-3 text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="p-4 bg-gray-700/30 rounded-lg flex items-start">
                  <Info className="h-6 w-6 text-primary-100 flex-shrink-0 mt-0.5" />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-100 mb-2">Important Information</h4>
                    <p className="text-gray-300">
                      This product is licensed for use on the specified number of devices. Please review our license agreement before purchase. For business or enterprise solutions, please contact our sales team.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'specs' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.technicalSpecs).map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-700 last:border-b-0">
                          <td className="py-3 pr-4 text-gray-400 font-medium">{key}</td>
                          <td className="py-3 text-gray-300">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">System Requirements</h3>
                  <div className="flex items-start mb-4">
                    <Server className="h-5 w-5 text-primary-100 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-100 mb-1">Minimum Requirements</h4>
                      <ul className="text-gray-300 space-y-1">
                        <li>• {product.technicalSpecs['Operating Systems']}</li>
                        <li>• {product.technicalSpecs['Minimum RAM']} RAM</li>
                        <li>• {product.technicalSpecs['Disk Space']} available disk space</li>
                        <li>• {product.technicalSpecs['Processor']}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">Customer Reviews</h3>
                    <div className="flex items-center mt-2">
                      <div className="flex mr-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            className={`h-5 w-5 ${
                              star <= Math.round(product.rating) 
                                ? 'text-warning-200 fill-warning-200' 
                                : 'text-gray-600'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-gray-300">Based on {product.reviewCount} reviews</span>
                    </div>
                  </div>
                  <button className="btn-outline">Write a Review</button>
                </div>
                
                <div className="space-y-6">
                  {/* Sample reviews - in a real app, these would come from an API */}
                  <div className="border-b border-gray-700 pb-6">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                          <span className="font-semibold text-gray-300">JD</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-100">John Doe</h4>
                          <span className="text-gray-400 text-sm">March 15, 2024</span>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            className="h-4 w-4 text-warning-200 fill-warning-200" 
                          />
                        ))}
                      </div>
                    </div>
                    <h5 className="font-semibold text-gray-100 mb-2">Exceptional protection, easy to use</h5>
                    <p className="text-gray-300">
                      I've tried many security products, but this one stands out for its powerful protection and intuitive interface. It detected threats that my previous software missed, and the system impact is minimal.
                    </p>
                  </div>
                  
                  <div className="border-b border-gray-700 pb-6">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                          <span className="font-semibold text-gray-300">AS</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-100">Alice Smith</h4>
                          <span className="text-gray-400 text-sm">February 28, 2024</span>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star, i) => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${
                              i < 4 ? 'text-warning-200 fill-warning-200' : 'text-gray-600'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <h5 className="font-semibold text-gray-100 mb-2">Great features, occasional performance issues</h5>
                    <p className="text-gray-300">
                      The protection this software offers is excellent, and I love the additional features like the password manager. The only downside is that it occasionally slows down my computer during scans, but otherwise it's a solid product.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                          <span className="font-semibold text-gray-300">RJ</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-100">Robert Johnson</h4>
                          <span className="text-gray-400 text-sm">January 10, 2024</span>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            className="h-4 w-4 text-warning-200 fill-warning-200" 
                          />
                        ))}
                      </div>
                    </div>
                    <h5 className="font-semibold text-gray-100 mb-2">Saved me from a ransomware attack</h5>
                    <p className="text-gray-300">
                      This product literally saved my data. It detected and blocked a ransomware attack that could have encrypted all my files. The real-time protection is impressive, and customer support was helpful when I needed assistance. Highly recommend!
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="btn-outline">Load More Reviews</button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;