import React, { useContext, useEffect, useState, createContext } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ContentContext } from '../Context/ContentContext';
import { ApiService } from '../API/ApiService';


const COLORS = [
    '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c',
    '#d0ed57', '#ffc658', '#ff7300', '#ff8500', '#ff9700',
    '#ffa900', '#ffbb00', '#ffd000', '#ffe200', '#fff400',
    '#d8f100', '#b3ed00', '#8ee800', '#69e300', '#44de00',
    '#1fda00', '#00d500', '#00b02a', '#00844e', '#005871',
    '#003195', '#6200b3', '#7f00a5', '#9c0098', '#b9008a',
    '#d6007d', '#f30070', '#ff0062', '#ff1944', '#ff3227',
    '#ff4b09', '#e66e00', '#cc9100', '#b4b400', '#9cd700',
];

async function fetchTypeOfProblemsSolved(searchValue) {
    try {
        const url = `https://codeforces.com/api/user.status?handle=${searchValue}`;
        const response = await ApiService(url);
        if (response && response.status === 'OK') {
            const submissions = response.result;
            const solvedTagsCount = {};

            submissions.forEach((submission) => {
                if (submission.verdict === 'OK') {
                    const problem = submission.problem;
                    const problemTags = problem.tags;

                    problemTags.forEach((tag) => {
                        if (tag in solvedTagsCount) {
                            solvedTagsCount[tag]++;
                        } else {
                            solvedTagsCount[tag] = 1;
                        }
                    });
                }
            });

            return solvedTagsCount;
        } else {
            return {};
        }
    } catch (error) {
        console.log(error);
        return {};
    }
}

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-xl">
                <p className="text-gray-200">{`${payload[0].name} : ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};


const renderLegend = (props) => {
    const { payload } = props;
    return (
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-4">
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


const QuestionsCat = ({ userName }) => {
    const { pageData } = useContext(ContentContext);
    const input = pageData.Type;

    const [solvedTags, setSolvedTags] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (input && input.solvedTags) {
                const data = await fetchTypeOfProblemsSolved(userName);
                setSolvedTags(data);
            }
        };

        if (input) {
            fetchData();
        }
    }, [input, userName]);

  
    if (!input || !input.solvedTags || !solvedTags) {
        return (
            <div className="p-8 sm:p-10 h-[400px] flex items-center justify-center">
                <p className="text-gray-400">Loading Topics Distribution...</p>
            </div>
        );
    }

    const data = Object.entries(solvedTags).map(([tag, count]) => ({ tag, count }));
    data.sort((a, b) => b.count - a.count);

    const maxDataPoints = 15;
    const visibleData = data.slice(0, maxDataPoints - 1);
    const remainingDataCount = data
        .slice(maxDataPoints - 1)
        .reduce((sum, entry) => sum + entry.count, 0);

    if (remainingDataCount > 0) {
        const othersDataPoint = {
            tag: 'Others',
            count: remainingDataCount,
        };
        visibleData.push(othersDataPoint);
    }

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        if (percent < 0.05) return null; // Don't render labels for small slices
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    return (
        <div className="p-6 sm:p-8">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-200 text-center mb-8">
                Topics Distribution of {userName || 'User'}
            </h3>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={visibleData}
                        dataKey="count"
                        nameKey="tag"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150}
                        fill="#8884d8" 
                    >
                        {visibleData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                    <Tooltip content={<CustomTooltip />} />

                    <Legend verticalAlign="bottom" align="center" content={renderLegend} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default QuestionsCat ;
