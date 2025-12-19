import React from 'react';
import { Tag, ChevronDown, CheckCircle } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all w-full sm:w-auto justify-between"
        aria-label="Filtrar por categoría"
      >
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-purple-600" />
          <span className="text-gray-700 font-medium">{selectedCategory}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>
      
      {/* Dropdown de categorías - para versión mobile/desktop completa */}
      <div className="mt-2 absolute z-10 hidden w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors ${
              selectedCategory === category 
                ? 'bg-purple-50 text-purple-700 font-medium' 
                : 'text-gray-700'
            }`}
          >
            {selectedCategory === category && (
              <CheckCircle className="w-4 h-4 text-purple-600" />
            )}
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;