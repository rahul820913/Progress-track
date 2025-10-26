import React, { useContext } from 'react';
import SearchContext from '../Context/SearchContext';
import CategoryChart from './TypeChart';
import RatingChart from './RatingChart';
import QuestionsCat from './QuestionsCat';
import RatingChanges from './RatingChanges';
import SubmissionActivity from './SubmissionActivity';
import SplitScreen from '../Content/UserProfile/Split';

// A component to show when no user is searched
const WelcomeMessage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in-down">
      Welcome to VisualForces
    </h2>
    <p className="text-lg text-gray-400 max-w-md animate-fade-in-up">
      Please enter a Codeforces username in the search bar above to see their statistics and visualizations.
    </p>
    <svg className="w-24 h-24 text-gray-600 mt-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    
    {/* Simple CSS for fade-in animations */}
    <style>{`
      @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in-down { animation: fadeInDown 0.8s ease-out; }
      .animate-fade-in-up { animation: fadeInUp 0.8s ease-out 0.2s backwards; }
    `}</style>
  </div>
);


function ExportAll() {
  const { searchValue } = useContext(SearchContext);
  
  return (
    // Main container with dark background and padding
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      {/* Conditionally render: Show charts only if searchValue exists */}
      {searchValue ? (
        // Responsive grid for the charts
        <div>
          <SplitScreen userName={searchValue} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <RatingChanges userName={searchValue} />
            <RatingChart userName={searchValue} />
            <CategoryChart userName={searchValue} />
          <QuestionsCat userName={searchValue} />  
          
        </div>
        <SubmissionActivity userName={searchValue} /> 
        </div>
      ) : (
        <WelcomeMessage />
      )}
    </div>
  );
}

export default ExportAll;
