import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { products } from '../../data/products';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof products>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const filteredResults = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length > 1) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      if (onClose) onClose();
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
    setQuery('');
    if (onClose) onClose();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, categories, or solutions..."
            className="input pr-12 w-full"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
            {query && (
              <button 
                type="button" 
                onClick={() => setQuery('')}
                className="p-1 text-gray-400 hover:text-gray-100"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button 
              type="submit" 
              className="p-1 text-primary-100 hover:text-primary-200 ml-1"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>

      {results.length > 0 && (
        <div className="mt-2 bg-gray-800 rounded-md shadow-lg max-h-96 overflow-y-auto">
          <ul>
            {results.map(product => (
              <li key={product.id} className="border-b border-gray-700 last:border-b-0">
                <button
                  onClick={() => handleProductClick(product.id)}
                  className="flex items-start p-3 w-full text-left hover:bg-gray-700 transition-colors"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-12 h-12 object-cover rounded mr-3"
                  />
                  <div>
                    <h4 className="text-gray-100 font-medium">{product.name}</h4>
                    <p className="text-gray-400 text-sm truncate">{product.shortDescription}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-primary-100 font-semibold">${product.price.toFixed(2)}</span>
                      <span className="text-xs text-gray-400 ml-2 badge badge-primary">{product.category}</span>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;