import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Light bulb outline */}
                <circle cx="20" cy="24" r="8" stroke="#2D3748" strokeWidth="1.5" fill="none"/>
                <path d="M17 32h6" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M18 35h4" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round"/>
                
                {/* Light rays */}
                <line x1="20" y1="8" x2="20" y2="11" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="28" y1="10" x2="26.5" y2="12" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="32" y1="18" x2="29" y2="18" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="12" y1="10" x2="13.5" y2="12" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="8" y1="18" x2="11" y2="18" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round"/>
                
                {/* Pencil */}
                <rect x="26" y="20" width="2" height="14" rx="1" transform="rotate(45 26 20)" fill="#2D3748"/>
                <path d="M32 14l-2-2 2-2 2 2-2 2z" fill="#2D3748"/>
                <circle cx="33" cy="12" r="1" fill="#FFA500"/>
              </svg>
              <span className="text-xl font-semibold text-gray-800">EMEXA</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-gray-900 transition-colors text-base">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 transition-colors text-base">
              How It Works
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-gray-900 transition-colors text-base">
              Testimonials
            </a>
          </div>

          {/* Get Started Button */}
          <div className="flex items-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;