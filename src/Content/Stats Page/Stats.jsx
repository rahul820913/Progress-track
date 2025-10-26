import * as React from 'react';
import { useEffect, useState, useContext, createContext } from 'react';
import SearchContext from '../../Context/SearchContext'; 
import {ApiService} from '../../API/ApiService'; 

async function fetchContestStats(handle) {
    try {
        const ratingURL = `https://codeforces.com/api/user.rating?handle=${handle}`;
        const ratingData = await ApiService(ratingURL);

        if (ratingData && ratingData.status === 'OK' && ratingData.result.length > 0) {
            const result = ratingData.result;
            let maxRank = -Infinity;
            let minRank = Infinity;
            const numberOfContest = ratingData.result.length;

            for (let i = 0; i < result.length; i++) {
                let rank = result[i].rank;
                if (rank > maxRank) {
                    maxRank = rank;
                }
                if (rank < minRank) {
                    minRank = rank;
                }
            }

            const changes = ratingData.result.reduce(
                (obj, change) => {
                    const ratChange = change.newRating - change.oldRating;
                    return {
                        max: Math.max(obj.max, ratChange),
                        min: Math.min(obj.min, ratChange),
                    };
                },
                { max: -Infinity, min: Infinity }
            );

            const minRatingDown = changes.min;
            const maxRatingUp = changes.max;

            return {
                minRank: minRank === Infinity ? 'N/A' : minRank,
                maxRank: maxRank === -Infinity ? 'N/A' : maxRank,
                numberOfContest,
                minRatingDown: minRatingDown === Infinity ? 'N/A' : minRatingDown,
                maxRatingUp: maxRatingUp === -Infinity ? 'N/A' : maxRatingUp,
            };
        } else {
             // Handle user with no contests
             return { minRank: 'N/A', maxRank: 'N/A', numberOfContest: 0, minRatingDown: 'N/A', maxRatingUp: 'N/A' };
        }
    } catch (error) {
        console.error('Error fetching contest stats:', error);
        // Return default values on error
        return { minRank: 'N/A', maxRank: 'N/A', numberOfContest: 0, minRatingDown: 'N/A', maxRatingUp: 'N/A' };
    }
}

async function fetchOverallStats(handle) {
    try {
        const submissionsUrl = `https://codeforces.com/api/user.status?handle=${handle}`;
        const submissionsResponse = await ApiService(submissionsUrl);
        let totalSubmission = 0;

        if (submissionsResponse && submissionsResponse.status === 'OK') {
            totalSubmission = submissionsResponse.result.length;

            const triedProblems = new Set();
            const correctProblems = new Set();

            submissionsResponse.result.forEach((submission) => {
                if (submission.problem) {
                    const problemId = submission.problem.contestId + submission.problem.index;
                    triedProblems.add(problemId);
                }
            });

            submissionsResponse.result.forEach((submission) => {
                if (submission.verdict === 'OK' && submission.problem) {
                    const problemId = submission.problem.contestId + submission.problem.index;
                    correctProblems.add(problemId);
                }
            });

            const totalTried = triedProblems.size;
            const totalSolved = correctProblems.size;

            return {
                totalSubmission,
                totalTried,
                totalSolved,
            };
        }
    } catch (error) {
        console.error('Error fetching overall stats:', error);
        // Return default values on error
        return { totalSubmission: 0, totalTried: 0, totalSolved: 0 };
    }
}

// Reusable component for each stat row
const StatRow = ({ label, value, valueColor = "text-gray-200" }) => (
    <div className="flex justify-between items-center py-3">
        <span className="text-sm font-medium text-gray-400">{label}</span>
        <span className={`text-sm font-semibold ${valueColor}`}>{value}</span>
    </div>
);

export default function Stats() {
    const { searchValue } = useContext(SearchContext);
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!searchValue) {
                setStats(null); // Clear stats if search is empty
                return;
            }
            
            setIsLoading(true);
            try {
                // Fetch in parallel for faster loading
                const [overallStats, contestStats] = await Promise.all([
                    fetchOverallStats(searchValue),
                    fetchContestStats(searchValue)
                ]);
                
                setStats({ overallStats, contestStats });
            } catch (error) {
                console.error('Error fetching data:', error);
                setStats(null); // Clear stats on error
            }
            setIsLoading(false);
        };

        fetchData();
    }, [searchValue]);


    if (!searchValue) {
         return (
             <div className="flex flex-col items-center justify-center pt-12 md:pt-24 px-4 h-96"> {/* Added h-96 for consistent height */}
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl border border-gray-700 h-full flex items-center justify-center">
                    <p className="text-gray-400">Search for a user to see their stats.</p>
                </div>
             </div>
         );
    }
    
    // --- THIS IS THE MODIFIED LOADING STATE ---
    if (isLoading) {
        return (
             <div className="flex flex-col items-center justify-center pt-12 md:pt-24 px-4 h-96"> {/* Added h-96 for consistent height */}
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl border border-gray-700 h-full flex flex-col items-center justify-center">
                    {/* The round loading circle (spinner) */}
                    <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400">Loading stats for {searchValue}...</p>
                </div>
             </div>
        );
    }
    // --- END OF MODIFICATION ---

    if (!stats || !stats.overallStats || !stats.contestStats) {
        // This can happen if the API fails or returns no data
         return (
             <div className="flex flex-col items-center justify-center pt-12 md:pt-24 px-4 h-96">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl border border-gray-700 h-full flex items-center justify-center">
                    <p className="text-red-400">Could not load stats for {searchValue}.</p>
                </div>
             </div>
         );
    }

    const { overallStats, contestStats } = stats;

    return (
        
        <div className="flex flex-col items-center justify-center pt-12 md:pt-24 px-4">
            <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full border border-gray-700">

                <div className="p-6">
                    {/* Converted Typography Title to h3 */}
                    <h3 className="text-2xl font-semibold text-gray-200 mb-6">
                        Stats for {searchValue}
                    </h3>
                    
                    {/* Converted Grid to flexbox rows with Dividers */}
                    <div className="space-y-2">
                        <StatRow
                            label="Number Of Contests:"
                            value={contestStats?.numberOfContest}
                        />
                        <hr className="border-gray-700" />
                        
                        <StatRow
                            label="Total Submissions:"
                            value={overallStats?.totalSubmission}
                        />
                        <hr className="border-gray-700" />
                        
                        <StatRow
                            label="Total Questions Tried:"
                            value={overallStats?.totalTried}
                        />
                        <hr className="border-gray-700" />
                        
                        <StatRow
                            label="Total Questions Solved:"
                            value={overallStats?.totalSolved}
                        />
                        <hr className="border-gray-700" />
                        
                        <StatRow
                            label="Max Rating Up:"
                            value={contestStats?.maxRatingUp}
                            valueColor={contestStats?.maxRatingUp > 0 ? "text-green-400" : "text-gray-200"}
                        />
                        <hr className="border-gray-700" />
                        
                        <StatRow
                            label="Max Rating Down:"
                            value={contestStats?.minRatingDown}
                            valueColor={contestStats?.minRatingDown < 0 ? "text-red-400" : "text-gray-200"}
                        />
                        <hr className="border-gray-700" />
                        
                        <StatRow
                            label="Best Rank:"
                            value={contestStats?.minRank}
                            valueColor="text-green-400"
                        />
                        <hr className="border-gray-700" />
                        
                        <StatRow
                            label="Worst Rank:"
                            value={contestStats?.maxRank}
                            valueColor="text-red-400"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

