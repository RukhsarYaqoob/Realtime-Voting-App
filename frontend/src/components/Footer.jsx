import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="text-2xl font-bold">
            Poll<span className="text-red-400">App</span>
          </Link>
          <p className="text-gray-400 text-sm mt-2">
            Create and share polls in seconds
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-6">
          <Link to="/" className="text-gray-400 hover:text-white">
            Home
          </Link>
          <Link to="/create" className="text-gray-400 hover:text-white">
            Create Poll
          </Link>
          <Link to="/browse" className="text-gray-400 hover:text-white">
            Browse Polls
          </Link>
          <Link to="/login" className="text-gray-400 hover:text-white">
            Login
          </Link>
          <Link to="/register" className="text-gray-400 hover:text-white">
            Register
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
          <p>© {currentYear} PollApp. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;