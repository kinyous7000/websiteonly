import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { ProductCategory } from '../../types/product';

const categories: { id: ProductCategory; name: string }[] = [
  { id: 'security-suite', name: 'Security Suites' },
  { id: 'antivirus', name: 'Antivirus Software' },
  { id: 'vpn', name: 'VPN Services' },
  { id: 'password-manager', name: 'Password Managers' },
  { id: 'encryption', name: 'Encryption Tools' },
  { id: 'firewall', name: 'Firewalls' },
  { id: 'monitoring', name: 'Monitoring Tools' },
  { id: 'courses', name: 'Security Courses' },
];

const CategoryFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === currentCategory) {
      // If clicking the current category, remove the filter
      searchParams.delete('category');
    } else {
      // Otherwise set the new category
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Categories</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center w-full text-left px-2 py-2 rounded ${
                currentCategory === category.id
                  ? 'bg-gray-700 text-primary-100'
                  : 'text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <div className={`w-5 h-5 mr-3 flex-shrink-0 rounded border ${
                currentCategory === category.id
                  ? 'border-primary-100 bg-primary-100/20'
                  : 'border-gray-600'
              } flex items-center justify-center`}>
                {currentCategory === category.id && (
                  <Check className="h-3 w-3 text-primary-100" />
                )}
              </div>
              <span>{category.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;