import React, { useContext, useEffect, useState, createContext } from 'react';
import { ContentContext } from '../../Context/ContentContext'; 
import SearchContext from '../../Context/SearchContext'; 
import { ApiService } from '../../API/ApiService'; 

const getRankColor = (rank) => {
    if (!rank) return 'text-gray-400';
    rank = rank.toLowerCase(); // Normalize rank string
    if (rank === 'newbie') return 'text-gray-400';
    if (rank === 'pupil') return 'text-green-400';
    if (rank === 'specialist') return 'text-cyan-400';
    if (rank === 'expert') return 'text-blue-400';
    if (rank === 'candidate master') return 'text-purple-400';
    if (rank.includes('master')) return 'text-orange-400'; // Covers master and international master
    if (rank.includes('grandmaster')) return 'text-red-500'; // Covers all grandmasters
    return 'text-gray-400'; // Default
};

// --- New Data Fetching Function ---
async function fetchUserInfo(handle) {
    try {
        const url = `https://codeforces.com/api/user.info?handles=${handle}`;
        const data = await ApiService(url);
        if (data && data.status === 'OK' && data.result.length > 0) {
            return data.result[0]; // Return the first user object
        }
        return null;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
}


export default function UserProfile() {
    const { searchValue } = useContext(SearchContext);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!searchValue) {
                setUserInfo(null);
                return;
            }
            setIsLoading(true);
            try {
                const data = await fetchUserInfo(searchValue);
                setUserInfo(data);
            } catch (error) {
                console.error(error);
                setUserInfo(null);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [searchValue]);


    // --- Loading State (with spinner) ---
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center pt-12 md:pt-24 px-4 h-full min-h-[500px] md:min-h-0">
                <div className="w-full max-w-sm h-500px bg-gray-800 rounded-lg shadow-xl border border-gray-700 h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400">Loading profile for {searchValue}...</p>
                </div>
            </div>
        );
    }

    // --- Empty State ---
    if (!userInfo) {
         return (
             <div className="flex flex-col items-center justify-center pt-12 md:pt-24 px-4 h-full min-h-[500px] md:min-h-0">
                 <div className="w-full max-w-sm h-500px bg-gray-800 rounded-lg shadow-xl border border-gray-700 h-full flex items-center justify-center">
                     <span className="text-gray-400">Search for a user...</span>
                 </div>
             </div>
         );
    }

    // --- Data Loaded State ---
    
    // Default image logic
    let image = userInfo.titlePhoto;
    if (image === 'https://userpic.codeforces.org/no-title.jpg') {
        image = 'https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1685624037~exp=1685624637~hmac=029d2dc94e8f02c29d72d258b93419adbe107704cecda134160948ca2b2d1aba';
    }

    const { 
        handle, 
        maxRank, 
        maxRating, 
        rank: currRank, 
        rating: currRating 
    } = userInfo;

    const maxRankColor = getRankColor(maxRank);
    const currRankColor = getRankColor(currRank);

    return (
        <div className="flex flex-col items-center justify-center pt-12 md:pt-24 px-4">
            <div className="bg-gray-800 rounded-lg shadow-xl max-w-sm w-full overflow-hidden border border-gray-700 transition-all duration-300 transform hover:shadow-2xl hover:scale-[1.02]">
                <img
                    className="w-full h-80 object-cover"
                    src={image}
                    alt={`${handle}'s profile picture`}
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1f2937/9ca3af?text=Image+Not+Found'; }}
                />
                <div className="p-6 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">
                        {handle}
                    </h3>
                    
                    <div className="space-y-2">
                        <p className="text-base font-semibold text-gray-300">
                            Max Rank: <span className={`font-bold ${maxRankColor}`}>{maxRank}</span>
                        </p>
                        <p className="text-base font-semibold text-gray-300">
                            Max Rating: <span className={`font-bold ${maxRankColor}`}>{maxRating}</span>
                        </p>
                        <p className="text-base font-semibold text-gray-300">
                            Current Rank: <span className={`font-bold ${currRankColor}`}>{currRank}</span>
                        </p>
                        <p className="text-base font-semibold text-gray-300">
                            Current Rating: <span className={`font-bold ${currRankColor}`}>{currRating}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
