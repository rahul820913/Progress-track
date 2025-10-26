import React, { useEffect, useState, createContext } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label, Dot } from 'recharts';
import { ApiService } from '../API/ApiService';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload; // Get the full data point
        const changeClass = data.ratChange >= 0 ? "text-green-400" : "text-red-400";
        
        return (
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-xl text-sm">
                <p className="text-gray-300 font-semibold mb-2 text-xs">{label}</p>
                <p className="text-purple-400">{`Rating: ${data.curRat}`}</p>
                <p className={changeClass}>
                    {`Change: ${data.ratChange >= 0 ? '+' : ''}${data.ratChange}`}
                </p>
            </div>
        );
    }
    return null;
};

// --- Custom Legend for Dark Mode ---
const renderLegend = (props) => {
    const { payload } = props;
    return (
        <ul className="flex justify-center gap-x-4 pt-2">
            {payload.map((entry, index) => {
                // Manually map keys to nice names
                let text = entry.dataKey;
                if (text === 'curRat') text = 'Current Rating';
                if (text === 'isHighest') text = 'Highest Rating';

                // Don't show the "isHighest" line in the legend, it's just for highlighting
                if (text === 'Highest Rating') return null;

                return (
                    <li key={`item-${index}`} className="flex items-center text-gray-300 text-xs">
                        <span 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: entry.color }} 
                        />
                        {text}
                    </li>
                );
            })}
        </ul>
    );
};


async function fetchRatingChanges(userName) {
    try {
        const url = `https://codeforces.com/api/user.rating?handle=${userName}`;
        const data = await ApiService(url);
        if (data && data.status === 'OK' && data.result) {
            const ratingChanges = data.result.map((contest) => ({
                contestName: contest.contestName,
                ratingChange: contest.newRating - contest.oldRating,
                currRating: contest.newRating,
            }));
            return ratingChanges;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

function RatingChanges({ userName }) {
    const [ratingChanges, setRatingChanges] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!userName) return; // Don't fetch if userName is not provided
            const data = await fetchRatingChanges(userName);
            setRatingChanges(data);
        };

        fetchData();
    }, [userName]);

    // Dark-themed loading state
    if (ratingChanges.length === 0) {
        return (
            <div className="p-8 sm:p-10 h-[400px] flex items-center justify-center">
                <p className="text-gray-400">Loading Rating Changes...</p>
            </div>
        );
    }

    const highestRating = Math.max(...ratingChanges.map((contest) => contest.currRating));

    const data = ratingChanges.map((contest) => ({
        name: contest.contestName.substring(0, 15) + '...', // Shorten name for X-axis
        ratChange: contest.ratingChange,
        curRat: contest.currRating,
        // This key is used to overlay a red dot on the highest rating point
        isHighest: contest.currRating === highestRating ? contest.currRating : null,
    }));

    return (
        // Wrapper with padding, assumes dark bg from parent
        <div className="p-6 sm:p-8">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-200 text-center mb-8">
                Rating Changes of {userName}
            </h3>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart 
                  data={data}
                  margin={{ top: 5, right: 10, left: -20, bottom: 20 }}
                >
                    {/* Dark mode grid */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    
                    {/* Main rating line */}
                    <Line
                        type="monotone"
                        dataKey="curRat"
                        stroke="#8884d8" // Purple line
                        dot={<Dot r={4} />}
                        strokeWidth={2}
                        isAnimationActive={true}
                        animationDuration={500}
                        name="Current Rating" // For legend
                    />
                    
                    {/* Highlight line for highest rating */}
                    <Line
                        type="monotone"
                        dataKey="isHighest"
                        stroke="transparent" // Hide the line itself
                        dot={<Dot r={5} fill="#ff0000" strokeWidth={2} />} // Show only red dots
                        isAnimationActive={false}
                        name="Highest Rating" // For legend
                    />
                    
                    {/* Dark mode axes and labels */}
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#9ca3af', fontSize: 10 }} 
                      stroke="#4b5563"
                      interval="preserveStartEnd" // Show first and last
                    >
                        <Label value="Contest" position="insideBottom" dy={20} fill="#9ca3af" fontSize={12} />
                    </XAxis>
                    <YAxis 
                      tick={{ fill: '#9ca3af', fontSize: 12 }} 
                      stroke="#4b5563"
                      domain={['dataMin - 100', 'dataMax + 100']} // Add padding to Y-axis
                    >
                        <Label value="Ratings" position="insideLeft" angle={-90} fill="#9ca3af" fontSize={12} />
                    </YAxis>
                    
                    {/* Custom dark mode Tooltip and Legend */}
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      align="center" 
                      verticalAlign="top" 
                      content={renderLegend} 
                      wrapperStyle={{ paddingTop: '10px' }} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default React.memo(RatingChanges);
