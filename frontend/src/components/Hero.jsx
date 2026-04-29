import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    /* h-screen logic to keep everything on one page without excessive scrolling */
    <div className="relative min-h-[90vh] py-10 flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-50 via-red-50 to-white">
      
      {/* Decorative Blur Blobs for UI Depth */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        
        {/* Badge - Compact */}
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-red-100 text-red-600 mb-6">
          🚀 Fast & Real-time
        </span>

        {/* Main Heading - Adjusted for one-screen impact */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
          Make Your Voice <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">
            Matter Instantly.
          </span>
        </h1>
        
        {/* Subtitle - Narrower for better readability */}
        <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto leading-relaxed">
          The ultimate platform to create, share, and analyze polls. 
          No credit card, no fluff—just pure data in real-time.
        </p>
        
        {/* CTA Buttons - More tactile look */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          {isAuthenticated ? (
            <Link
              to="/create"
              className="w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold shadow-2xl hover:bg-slate-800 transform hover:-translate-y-1 transition-all"
            >
              Create Your Poll
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="w-full sm:w-auto bg-red-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-red-200 hover:bg-red-700 transform hover:-translate-y-1 transition-all"
              >
                Get Started Free
              </Link>
              <Link
                to="/browse"
                className="w-full sm:w-auto bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Browse Polls
              </Link>
            </>
          )}
        </div>
        
        {/* Stats Grid - Now more compact and card-styled */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto bg-white/40 backdrop-blur-sm p-6 rounded-[2rem] border border-white/60 shadow-sm">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-black text-slate-900">10k+</div>
            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Polls</div>
          </div>
          <div className="text-center border-x border-slate-200 px-2">
            <div className="text-2xl md:text-3xl font-black text-slate-900">500k+</div>
            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Votes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-black text-red-600">Free</div>
            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Always</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;