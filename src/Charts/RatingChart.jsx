import React, { useContext, createContext } from 'react';
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label
} from 'recharts';
import { ContentContext } from '../Context/ContentContext'; 

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-xl">
                <p className="text-gray-300 text-sm font-semibold mb-1">{`Rating: ${label}`}</p>
                <p className="text-purple-400 text-xs">{`Problems Solved: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

// --- Custom Legend for Dark Mode ---
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
                    {/* Manually set legend text */}
                    Problems Solved
                </li>
            ))}
        </ul>
    );
};


const RatingChart = ({ userName }) => {
    const { pageData } = useContext(ContentContext);
    const input = pageData.Type;

    // Dark-themed loading state
    if (!input || !input.solvedRatings) {
        return (
            <div className="p-8 sm:p-10 h-[400px] flex items-center justify-center">
                <p className="text-gray-400">Loading Rating Chart...</p>
            </div>
        );
    }

    const { solvedRatings } = input;

    const data = Object.entries(solvedRatings)
        .map(([rating, count]) => ({ rating: parseInt(rating), count })) // Ensure rating is a number for sorting
        .filter((entry) => !isNaN(entry.rating)) // Filter out any 'undefined' or NaN
        .sort((a, b) => a.rating - b.rating); // Sort by rating ascending

    return (
        // Wrapper with padding, assumes dark bg from parent
        <div className="p-6 sm:p-8">
            {/* Title styled with Tailwind */}
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-200 text-center mb-8">
                Rating Distribution of {userName}
            </h3>
            
            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 10,
                        bottom: 20,
                        left: -10, // Adjust left margin to pull Y-axis closer
                    }}
                >
                    {/* Dark mode grid */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    
                    {/* Dark mode axes and labels */}
                    <XAxis 
                      dataKey="rating"
                      tick={{ fill: '#9ca3af', fontSize: 12 }} 
                      stroke="#4b5563"
                    >
                        <Label value="Rating" position="insideBottom" dy={20} fill="#9ca3af" fontSize={12} />
                    </XAxis>
                    <YAxis
                      tick={{ fill: '#9ca3af', fontSize: 12 }} 
                      stroke="#4b5563"
                    >
                        <Label value="No. of problems" position="insideLeft" angle={-90} fill="#9ca3af" fontSize={12} />
                    </YAxis>
                    
                    {/* Custom dark mode Tooltip and Legend */}
                    <Tooltip
                        cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }} // Faint purple cursor
                        content={<CustomTooltip />}
                    />
                    <Legend 
                      verticalAlign="top" 
                      content={renderLegend}
                      wrapperStyle={{ paddingTop: '10px' }} 
                    />
                    
                    {/* Bar with animation */}
                    <Bar 
                      dataKey="count" 
                      fill="#a996e1" // Purple bar
                      barSize={30} 
                      radius={[10, 10, 0, 0]} // Rounded top
                      animationDuration={500}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

// Reverted export to default export the chart component directly
export default RatingChart;

