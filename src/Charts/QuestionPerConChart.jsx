import React, { useContext} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ContentContext } from '../Context/ContentContext';
import SearchContext from '../Context/SearchContext';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-xl">
                <p className="text-gray-300 text-sm font-semibold mb-1">{label}</p>
                <p className="text-blue-400 text-xs">{`Solved: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const renderLegend = (props) => {
    const { payload } = props;
    return (
        <ul className="flex justify-center gap-x-4 pt-4">
            {payload.map((entry, index) => (
                <li key={`item-${index}`} className="flex items-center text-gray-300 text-xs">
                    <span 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: entry.color }} 
                    />
                    {entry.value}
                </li>
            ))}
        </ul>
    );
};


function QuestionPerConChart() {
    const { pageData } = useContext(ContentContext);
    const { searchValue } = useContext(SearchContext);

    const response = pageData.prob;

    // Show a loading/empty state that matches the dark theme
    if (!response || response.length === 0) {
        return (
            <div className="p-8 sm:p-10 h-[400px] flex items-center justify-center">
                <p className="text-gray-400">Loading Questions Per Contest...</p>
            </div>
        );
    }

    const chartData = response.map((item) => ({
        contestName: item.contestName,
        count: item.count,
    }));

    return (
        // Wrapper with padding, assumes dark bg from parent
        <div className="p-6 sm:p-8">
            {/* Title styled with Tailwind */}
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-200 text-center mb-8">
                Questions Solved Per Contest by {searchValue}
            </h3>

            {/* Recharts Responsive Container */}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={chartData}
                  margin={{ top: 5, right: 10, left: -20, bottom: 5 }} // Adjust margins
                >
                    {/* Dark mode grid */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    
                    {/* Dark mode axes labels */}
                    <XAxis 
                      dataKey="contestName" 
                      tick={{ fill: '#9ca3af', fontSize: 12 }} 
                      stroke="#4b5563"
                    />
                    <YAxis 
                      tick={{ fill: '#9ca3af', fontSize: 12 }} 
                      stroke="#4b5563"
                    />
                    
                    {/* Dark mode tooltip */}
                    <Tooltip content={<CustomTooltip />} />
                    
                    {/* Dark mode legend */}
                    <Legend wrapperStyle={{ fontSize: 12 }} content={renderLegend} />
                    
                    <Bar 
                      dataKey="count" 
                      fill="#82ca9d" // Green bars
                      barSize={30} 
                      radius={[10, 10, 0, 0]} // Rounded top corners
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default QuestionPerConChart;

