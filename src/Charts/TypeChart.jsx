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
                <p className="text-gray-300 text-sm font-semibold mb-1">{`Level: ${label}`}</p>
                <p className="text-blue-400 text-xs">{`Problems Solved: ${payload[0].value}`}</p>
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
                  
                    Problems Solved
                </li>
            ))}
        </ul>
    );
};


const CategoryChart = ({ userName }) => {
    const { pageData } = useContext(ContentContext);
    const input = pageData.Type;

    if (!input || !input.solvedCategories) {
        return (
            <div className="p-8 sm:p-10 h-[400px] flex items-center justify-center">
                <p className="text-gray-400">Loading Category Chart...</p>
            </div>
        );
    }

    const { solvedCategories } = input;

    const data = Object.entries(solvedCategories)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => a.category.localeCompare(b.category)); 

    return (
       
        <div className="p-6 sm:p-8">
           
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-200 text-center mb-8">
                Problem Levels for {userName}
            </h3>

            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 10,
                        bottom: 20,
                        left: -10, 
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

                    <XAxis
                        dataKey="category"
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        stroke="#4b5563"
                    >
                        <Label value="Level" position="insideBottom" dy={20} fill="#9ca3af" fontSize={12} />
                    </XAxis>
                    <YAxis
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        stroke="#4b5563"
                    >
                        <Label value="No. of problems" position="insideLeft" angle={-90} fill="#9ca3af" fontSize={12} />
                    </YAxis>

                    <Tooltip
                        cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }} 
                        content={<CustomTooltip />}
                    />
                    <Legend
                        verticalAlign="top"
                        content={renderLegend}
                        wrapperStyle={{ paddingTop: '10px' }}
                    />

                    <Bar
                        dataKey="count"
                        fill="#8884d8"
                        barSize={30}
                        radius={[10, 10, 0, 0]} 
                        animationDuration={500}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryChart;

