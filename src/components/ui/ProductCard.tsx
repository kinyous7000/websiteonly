import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div 
      className="card border border-gray-700 group"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link to={`/products/${product.id}`} className="block h-full">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover object-center"
          />
          <div className="absolute top-0 right-0 p-2 flex space-x-1">
            {product.isNewRelease && (
              <span className="badge badge-primary">New</span>
            )}
            {product.isFeatured && (
              <span className="badge badge-success">Featured</span>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-100 group-hover:text-primary-100 transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-warning-200 fill-warning-200" />
              <span className="text-sm ml-1 text-gray-300">{product.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.shortDescription}</p>
          
          <div className="flex items-center justify-between mb-2">
            <div>
              {product.discountPrice ? (
                <div className="flex items-center">
                  <span className="text-lg font-bold text-primary-100">${product.discountPrice.toFixed(2)}</span>
                  <span className="text-sm text-gray-400 line-through ml-2">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-lg font-bold text-primary-100">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            <span className="text-xs text-gray-400 badge bg-gray-700">{product.category}</span>
          </div>
          
          {product.licenseType === 'subscription' && (
            <div className="text-xs text-gray-400 mb-4">
              {product.licenseDuration} subscription
            </div>
          )}
          
          <div className="mt-4 flex justify-between items-center">
            <Link 
              to={`/products/${product.id}`}
              className="text-sm font-medium text-primary-100 hover:text-primary-200 transition-colors"
            >
              View Details
            </Link>
            
            <button
              onClick={handleAddToCart}
              className="btn-accent py-2 px-3 text-sm flex items-center"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;