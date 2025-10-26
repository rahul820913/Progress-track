import React from 'react';
import UserProfile from './UserProfile.jsx'; 
import Stats from '../Stats Page/Stats.jsx'; 



const SplitScreen = () => {
    return (

        <div className="bg-gray-900 min-h-screen p-4 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
                <div className="w-full md:w-1/2">
                    <UserProfile />
                </div>
                <div className="w-full md:w-1/2">
                    <Stats />
                </div>
            </div>
        </div>
    );
};

export default SplitScreen;

