import React, { useContext, useState } from "react";
import SearchContext from "../Context/SearchContext"; 


const InfoIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);

const SearchIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
    />
  </svg>
);
// --- End SVG Icons ---


const AlertMessage = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="p-3 text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110 focus:outline-none"
        aria-label="Info"
      >
        <InfoIcon />
      </button>

      {/* Popover Menu (Styled for dark theme) */}
      <div 
        className={`
          absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64
          bg-gray-800 text-gray-200 text-sm
          rounded-lg border border-gray-700 shadow-2xl p-3 z-50
          transition-all duration-300 ease-out
          ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
        `}
      >
        <p>
          Please refresh the page and try again if the data doesn't appear.
        </p>
      </div>
    </div>
  );
};

const Search = () => {
  const { setSearchValue } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      setSearchValue(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    // Wrapper to add padding and the dark background color
    <div className="flex justify-center py-10 w-full px-4 bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className={`
          flex items-center w-full max-w-lg mx-auto
          bg-gray-800 rounded-full shadow-xl
          border-2 border-transparent 
          transition-all duration-300
          focus-within:ring-4 focus-within:ring-blue-500/50 focus-within:border-blue-500
        `}
      >
        {/* Info Button */}
        <AlertMessage />

        {/* Input */}
        <input
          type="text"
          placeholder="Search Codeforces User"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="
            flex-1 pl-1 pr-4 py-3 bg-transparent 
            text-white placeholder-gray-400 
            focus:outline-none
          "
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="
            p-3 mr-1 text-white bg-blue-600 rounded-full
            hover:bg-blue-700 transition-all duration-300 
            hover:scale-110 focus:outline-none
          "
          aria-label="Search"
        >
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default Search;

