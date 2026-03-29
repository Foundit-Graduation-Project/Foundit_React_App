import React from 'react';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

/**
 * 🔍 Reusable Search Bar Component
 * Synchronizes with the 'search' URL query parameter.
 * Used in Home and My Reports feeds.
 */
const SearchBar = ({ 
    placeholder = "Search for lost keys, pets, or wallets...", 
    className = "" 
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') || "";

    const handleSearch = (e) => {
        const value = e.target.value;
        
        // Update URL search parameters
        if (value) {
            // Preserve existing parameters (if any) and update search
            const newParams = Object.fromEntries(searchParams.entries());
            newParams.search = value;
            setSearchParams(newParams);
        } else {
            // Remove search from parameters
            const newParams = Object.fromEntries(searchParams.entries());
            delete newParams.search;
            setSearchParams(newParams);
        }
    };

    return (
        <div className={`relative ${className}`}>
            {/* Search Icon */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Search className="h-4 w-4" />
            </div>

            {/* Input Field */}
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder={placeholder}
                className="w-full h-10 pl-11 pr-4 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all duration-200 outline-none shadow-sm"
            />
        </div>
    );
};

export default SearchBar;
