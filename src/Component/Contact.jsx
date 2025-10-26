import React from "react";

const Contact = () => {
  return (
    // Use dark background and padding to account for sticky header/footer
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 p-4 pt-24 pb-32">
      <div className="w-full max-w-lg">
        {/* Dark form card with subtle border */}
        <div className="bg-gray-800 shadow-xl rounded-lg p-8 border border-gray-700/50">
          {/* Gradient text for the title */}
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-red from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Have a question or project in mind? I'd love to hear from you.
          </p>
          
          <form
            action="https://getform.io/f/092f9cb3-e7e9-4288-9973-1f49ef22dd61"
            method="POST"
            className="space-y-6" // Increased space between fields
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Styled Inputs */}
              <input
                type="text"
                name="FirstName"
                placeholder="First Name"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
            </div>
            <input
              type="email"
              name="Email"
              placeholder="Your Email"
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
            <textarea
              name="Message"
              placeholder="Your Message..."
              rows={5} // Slightly taller
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
            {/* Styled Button with hover effect */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
