import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowDownAZ, ArrowUpAZ, DollarSign } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import CategoryFilter from '../components/ui/CategoryFilter';
import { Product } from '../types/product';

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'rating-desc';

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('rating-desc');
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  const categoryFilter = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    result = sortProducts(result, sortBy);
    
    setFilteredProducts(result);
  }, [categoryFilter, searchQuery, sortBy]);

  const sortProducts = (productsToSort: Product[], sortOption: SortOption) => {
    switch (sortOption) {
      case 'name-asc':
        return [...productsToSort].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return [...productsToSort].sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return [...productsToSort].sort((a, b) => {
          const aPrice = a.discountPrice || a.price;
          const bPrice = b.discountPrice || b.price;
          return aPrice - bPrice;
        });
      case 'price-desc':
        return [...productsToSort].sort((a, b) => {
          const aPrice = a.discountPrice || a.price;
          const bPrice = b.discountPrice || b.price;
          return bPrice - aPrice;
        });
      case 'rating-desc':
        return [...productsToSort].sort((a, b) => b.rating - a.rating);
      default:
        return productsToSort;
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as SortOption);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {categoryFilter 
              ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1).replace('-', ' ')} Products`
              : searchQuery
                ? `Search Results for "${searchQuery}"`
                : 'All Products'
            }
          </h1>
          <button 
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="md:hidden flex items-center px-4 py-2 bg-gray-800 rounded-lg"
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className={`md:w-1/4 space-y-6 ${filtersVisible ? 'block' : 'hidden md:block'}`}>
            <CategoryFilter />
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="price-1" 
                    className="h-4 w-4 rounded border-gray-600 text-primary-100 focus:ring-primary-100"
                  />
                  <label htmlFor="price-1" className="ml-2 text-gray-300">Under $50</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="price-2" 
                    className="h-4 w-4 rounded border-gray-600 text-primary-100 focus:ring-primary-100"
                  />
                  <label htmlFor="price-2" className="ml-2 text-gray-300">$50 - $100</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="price-3" 
                    className="h-4 w-4 rounded border-gray-600 text-primary-100 focus:ring-primary-100"
                  />
                  <label htmlFor="price-3" className="ml-2 text-gray-300">$100 - $200</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="price-4" 
                    className="h-4 w-4 rounded border-gray-600 text-primary-100 focus:ring-primary-100"
                  />
                  <label htmlFor="price-4" className="ml-2 text-gray-300">Over $200</label>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">License Type</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="license-1" 
                    className="h-4 w-4 rounded border-gray-600 text-primary-100 focus:ring-primary-100"
                  />
                  <label htmlFor="license-1" className="ml-2 text-gray-300">Subscription</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="license-2" 
                    className="h-4 w-4 rounded border-gray-600 text-primary-100 focus:ring-primary-100"
                  />
                  <label htmlFor="license-2" className="ml-2 text-gray-300">Perpetual</label>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Operating System</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="os-1" 
                    className="h-4 w-4 rounded border-gray-600 text-primary-100 focus:ring-primary-100"
                  />
                  <label htmlFor="os-1" className="ml-2 text-gray-300">Windows</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="os-2" 
                    className="h-4 w-4 rounded border-gray-600 text-primary-100 focus:ring-primary-100"
                  />
                  <label htmlFor="os-2" className="ml-2 text-gray-300">macOS</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="os-3" 
                    className="h-4 w-4 rounded border-gray-600 text-primary-100 focus:ring-primary-100"
                  />
                  <label htmlFor="os-3" className="ml-2 text-gray-300">Linux</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="os-4" 
                    className="h-4 w-4 rounded border-gray-600 text-primary-100 focus:ring-primary-100"
                  />
                  <label htmlFor="os-4" className="ml-2 text-gray-300">iOS</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="os-5" 
                    className="h-4 w-4 rounded border-gray-600 text-primary-100 focus:ring-primary-100"
                  />
                  <label htmlFor="os-5" className="ml-2 text-gray-300">Android</label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-300">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
              <div className="flex items-center space-x-2">
                <label htmlFor="sort-by" className="text-gray-300 whitespace-nowrap">Sort by:</label>
                <select 
                  id="sort-by" 
                  value={sortBy}
                  onChange={handleSortChange}
                  className="bg-gray-700 border border-gray-600 text-gray-100 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-100"
                >
                  <option value="rating-desc">Highest Rated</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-300 mb-4">
                  We couldn't find any products matching your current filters.
                </p>
                <button 
                  onClick={() => window.location.href = '/products'}
                  className="btn-outline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;