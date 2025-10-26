import React from 'react';

// Define the functional component for the logo
const ProgressTrackLogo = ({ width = 80, height = 80, className = "" }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className={className} // Pass any additional classes
        >
            <defs>
                {/* Gradient Definition */}
                <linearGradient id="progressGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} /> {/* Blue start */}
                    <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 1 }} /> {/* Green end */}
                </linearGradient>
            </defs>

            {/* Bar elements suggesting steps/growth */}
            <rect x="20" y="60" width="15" height="20" rx="3" fill="#60a5fa" /> {/* Light Blue */}
            <rect x="40" y="45" width="15" height="35" rx="3" fill="#3b82f6" /> {/* Medium Blue */}
            <rect x="60" y="30" width="15" height="50" rx="3" fill="url(#progressGradient2)" /> {/* Gradient Bar */}

            {/* Checkmark element integrated */}
            {/* White outline for better visibility */}
            <path
                d="M 55 50 L 65 60 L 85 40"
                stroke="#FFFFFF"
                strokeWidth="6" // Changed stroke-width to strokeWidth
                strokeLinecap="round" // Changed stroke-linecap to strokeLinecap
                strokeLinejoin="round" // Changed stroke-linejoin to strokeLinejoin
            />
            {/* Green checkmark */}
            <path
                d="M 55 50 L 65 60 L 85 40"
                stroke="#10b981"
                strokeWidth="4" // Changed stroke-width to strokeWidth
                strokeLinecap="round" // Changed stroke-linecap to strokeLinecap
                strokeLinejoin="round" // Changed stroke-linejoin to strokeLinejoin
            />
        </svg>
    );
};

// Export the component
export default ProgressTrackLogo;
