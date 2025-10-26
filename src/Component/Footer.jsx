import React from "react";
// Removed the react-icons import as we will use inline SVGs

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center max-w-5xl mx-auto text-center space-y-6">
        
        {/* Brand Name */}

        <a 
          href="/" 
          className="mx-auto text-3xl font-bold text-white hover:text-gray-200 transition-colors duration-300"
          aria-label="VisualForces Homepage"
        >
          VisualForces
        </a>

        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          {/* Instagram SVG Icon */}
          <a
            href="https://www.instagram.com/rahulsm6940/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="VisualForces on Instagram"
            className="hover:text-pink-400 transition-colors duration-300"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-7 h-7" // Corresponds to size={28}
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.227-1.667 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.667-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.74 0 8.333.012 7.053.072 2.695.272.273 2.69.073 7.052.012 8.333 0 8.74 0 12s.012 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.988 8.74 24 12 24s3.667-.012 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.06-1.28.073-1.687.073-4.947s-.013-3.667-.072-4.947C23.728 2.69 21.31 2.7 16.947.072 15.667.012 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
            </svg>
          </a>
          {/* LinkedIn SVG Icon */}
          <a
            href="https://www.linkedin.com/in/rahul-singh-meena-95ab16279/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rahul Singh Meena on LinkedIn"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-7 h-7"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          {/* GitHub SVG Icon */}
          <a
            href="https://github.com/rahul820913"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rahul Singh Meena on GitHub"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-7 h-7"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>

        {/* Copyright & Developer Info */}
        <div className="space-y-2 text-sm">
          <p>
            Developed with <span role="img" aria-label="heart">❤️</span> by{" "}
            <a
              href="https://www.linkedin.com/in/rahul-singh-meena-95ab16279/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 font-medium hover:underline"
            >
              Rahul Singh
            </a>
          </p>
          <p>
            &copy; {new Date().getFullYear()} VisualForces. All rights
            reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;

