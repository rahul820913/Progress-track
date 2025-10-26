import React, { useEffect, useState } from 'react';
import { ApiService } from '../API/ApiService';
const getPastYearDays = () => {
    const today = new Date();
    const days = [];
    const oneYearAgo = new Date(today);
    oneYearAgo.setDate(today.getDate() - 364);

    const startOfWeek = new Date(oneYearAgo);
    startOfWeek.setDate(oneYearAgo.getDate() - oneYearAgo.getDay());

    for (let i = 0; i < 371; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        days.push(date); 
    }
    
    return days.slice(-371);
};


const getFormattedDate = (date) => {
    return date.toISOString().split('T')[0];
};

async function fetchSubmissionActivity(userName) {
    try {
        const url = `https://codeforces.com/api/user.status?handle=${userName}&from=1&count=3000`;
        const data = await ApiService(url);

        if (data && data.status === 'OK' && data.result) {
            const submissionsMap = new Map();
            const oneYearAgo = new Date();
            oneYearAgo.setDate(oneYearAgo.getDate() - 365);
            const oneYearAgoSeconds = oneYearAgo.getTime() / 1000;

            data.result.forEach((submission) => {
                if (submission.creationTimeSeconds >= oneYearAgoSeconds && submission.verdict === 'OK') {
                    const date = new Date(submission.creationTimeSeconds * 1000);
                    const formattedDate = getFormattedDate(date);
                    const count = submissionsMap.get(formattedDate) || 0;
                    submissionsMap.set(formattedDate, count + 1);
                }
            });
            return submissionsMap;
        } else {
            return new Map();
        }
    } catch (error) {
        console.error(error);
        return new Map();
    }
}


const DayLabels = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return (
       
        <div className="grid grid-rows-7 gap-1 text-xs text-gray-400 w-6 md:w-8 justify-items-end pr-2 pt-6 shrink-0">
            {days.map((day, i) => (
                <div key={i} className={`h-3 md:h-4 flex items-center ${i % 2 === 0 ? 'opacity-0' : ''}`}>
                    {day}
                </div>
            ))}
        </div>
    );
};


const MonthLabels = ({ days }) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthLabels = [];
    let lastMonth = -1;

   
    for (let i = 0; i < Math.ceil(days.length / 7); i++) { 
         const firstDayOfWeekIndex = i * 7;
         if (firstDayOfWeekIndex >= days.length) break; 

         const day = days[firstDayOfWeekIndex];
         const month = day.getMonth();

         if (month !== lastMonth) {

             if (!monthLabels.some(label => label.name === months[month])) {
                monthLabels.push({ name: months[month], colIndex: i });
             }
             lastMonth = month;
         } else if (day.getDate() <= 7 && !monthLabels.some(label => label.name === months[month])) {
             monthLabels.push({ name: months[month], colIndex: i });
             lastMonth = month; 
         }
    }


    return (
      
        <div className="grid grid-cols-53 gap-1 text-xs text-gray-400 w-full mb-1 h-5">
            {Array.from({ length: 53 }).map((_, i) => {
                const month = monthLabels.find(m => m.colIndex === i);
                return (
                    <div key={i} className="text-left relative">
                        
                        {month ? <span className="absolute left-0 top-0">{month.name}</span> : ''}
                    </div>
                );
            })}
        </div>
    );
};


const getColorClass = (count, date) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const dayDate = new Date(date);
    dayDate.setHours(0,0,0,0);

    if (dayDate > today) {
        
        return 'bg-transparent border border-gray-800';
    }

    if (count === 0) return 'bg-gray-700';
    if (count <= 2) return 'bg-green-800';
    if (count <= 5) return 'bg-green-600';
    if (count <= 10) return 'bg-green-400';
    return 'bg-green-200';
};

function SubmissionActivity({ userName }) {
    const [submissionMap, setSubmissionMap] = useState(new Map());
    const [days, setDays] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const allDays = getPastYearDays();
        setDays(allDays);

        const fetchData = async () => {
            if (!userName) {
                setSubmissionMap(new Map());
                return;
            }
            setIsLoading(true);
            const data = await fetchSubmissionActivity(userName);
            setSubmissionMap(data);
            setIsLoading(false);
        };

        fetchData();
    }, [userName]);

    if (isLoading) {
         return (
            <div className="p-8 sm:p-10 h-[260px] flex flex-col items-center justify-center bg-gray-900">
                {/* SVG Loading Spinner */}
                <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-400">Loading Submission Activity...</p>
            </div>
        );
    }

    if (!userName) {
        return (
            <div className="p-8 sm:p-10 h-[260px] flex items-center justify-center bg-gray-900">
                <p className="text-gray-400">Search for a user to see their submission activity.</p>
            </div>
        );
    }

    if (days.length === 0 && !isLoading) { // Show loading only if days aren't ready
       return (
            <div className="p-8 sm:p-10 h-[260px] flex items-center justify-center bg-gray-900">
                <p className="text-gray-400">Initializing heatmap...</p>
            </div>
        );
    }

    const todayStr = getFormattedDate(new Date());

    return (
        <div className="p-6 sm:p-8 bg-gray-900 overflow-hidden">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-200 text-center mb-6">
                Submission Activity
            </h3>

            <div className="flex w-full">
                {/* Day Labels (Fixed on the left) */}
                <DayLabels />

                {/* Scrollable Container for Month Labels and Grid */}
                <div className="flex-1 overflow-x-auto pb-4"> {/* Added pb-4 for scrollbar space */}
                    {/* Container with Min Width for scrolling */}
                    <div style={{ minWidth: '720px' }}> {/* Adjust min-width as needed */}
                        {/* Month Labels (Scrolls with grid) */}
                        <MonthLabels days={days} />

                        {/* Heatmap Grid (Scrolls) */}
                        <div className="grid grid-rows-7 grid-flow-col auto-cols-auto gap-1"
                             style={{ gridTemplateColumns: `repeat(53, minmax(0, 1fr))` }} // Fixed 53 columns
                        >
                            {days.map((day) => {
                                const formattedDate = getFormattedDate(day);
                                const dayDate = new Date(day);
                                dayDate.setHours(0,0,0,0);
                                const today = new Date();
                                today.setHours(0,0,0,0);

                                // Skip rendering cell content visually if it's a future date
                                // But keep the div for grid structure
                                if (dayDate > today) {
                                   return (
                                        <div
                                            key={formattedDate}
                                            className="aspect-square rounded-sm bg-transparent border border-gray-800"
                                        >
                                             <title>Future Date</title>
                                        </div>
                                   );
                                }

                                const count = submissionMap.get(formattedDate) || 0;
                                const colorClass = getColorClass(count, day);
                                const tooltip = `${count} submissions on ${day.toDateString()}`;

                                return (
                                    <div
                                        key={formattedDate}
                                        className={`aspect-square rounded-sm ${colorClass} transition-transform duration-100 hover:scale-110 hover:shadow-lg`}
                                        style={{ minWidth: '12px' }} // Ensure minimum size for squares
                                    >
                                        <title>{tooltip}</title>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-end items-center space-x-2 text-xs text-gray-400 mt-4 pr-4 w-full">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-gray-700"></div>
                <div className="w-3 h-3 rounded-sm bg-green-800"></div>
                <div className="w-3 h-3 rounded-sm bg-green-600"></div>
                <div className="w-3 h-3 rounded-sm bg-green-400"></div>
                <div className="w-3 h-3 rounded-sm bg-green-200"></div>
                <span>More</span>
            </div>
        </div>
    );
}

export default React.memo(SubmissionActivity);
