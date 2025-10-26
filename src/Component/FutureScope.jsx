import React from "react";

const FutureScope = () => {
  return (
    // Use dark background and padding to account for sticky header/footer
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-4 py-8">
        
        {/* Header Box */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-xl border border-gray-700/50">
          {/* Gradient text for the title */}
          <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-red from-blue-400 to-indigo-500 bg-clip-text text-violet-500">
            Future Scopes
          </h1>
          <p className="text-gray-300 text-center text-lg">
            Our website has a bright future ahead with several exciting scopes
            and possibilities. Here are some of the key areas we plan to explore
            and enhance:
          </p>
        </div>

        {/* Scopes Container */}
        <div className="space-y-6">
          {/* Scope 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-blue-500/10">
            <h2 className="text-2xl font-semibold mb-3 text-blue-400">
              1. Performance Comparison
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Comparing the performance of multiple Codeforces users based on their ratings,
              solve counts, accuracy, and contest rankings. One can generate side-by-side
              visualizations or tables to highlight the differences in performance between users.
            </p>
          </div>

          {/* Scope 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-indigo-500/10">
            <h2 className="text-2xl font-semibold mb-3 text-indigo-400">
              2. Friend Recommendation System
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Building a recommendation system that suggests Codeforces friends based on user profiles,
              problem-solving history, and mutual connections. One can leverage user ratings, solve counts,
              common problem submissions, and other metrics to identify potential friends for oneself.
            </p>
          </div>

          {/* Scope 3 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-purple-500/10">
            <h2 className="text-2xl font-semibold mb-3 text-purple-400">
              3. Predictive Modeling
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Use machine learning techniques to predict users' future ratings based on their past performance,
              contest history, and problem-solving patterns. We can train a model using historical data
              and evaluate its accuracy in predicting rating changes for users.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default FutureScope;

